//ESP_32 & Micro SD .ino code
//by: T.C. Tantokusumo
//2022

//the credential informations .h file
#include "secrets.h"

//Include the JSON & WiFi libraries
#include <WiFiClientSecure.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <WiFi.h>

//Include the micro SD libraries
#include "FS.h"
#include "SD.h"
#include "SPI.h"

//Defining the publish & subscribe topics
#define AWS_IOT_PUBLISH_TOPIC   "esp32/pub"
#define AWS_IOT_SUBSCRIBE_TOPIC "esp32/sub"
#define MQTT_PACKET_SIZE  16384

WiFiClientSecure net = WiFiClientSecure();
PubSubClient client(net);

//for data indexing purpose
long no_index = 1;
int buff = 0;
int n_size = 25;
int dataArray [25];
long idArray [25];

void connectAWS()
{
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);

  Serial.println("Connecting to Wi-Fi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  //Configure WiFiClientSecure to use the AWS IoT device credentials
  net.setCACert(AWS_CERT_CA);
  net.setCertificate(AWS_CERT_CRT);
  net.setPrivateKey(AWS_CERT_PRIVATE);

  //Connect to the MQTT broker on the AWS endpoint
  client.setServer(AWS_IOT_ENDPOINT, AWS_PORT_NUMBER);

  //Create a message handler
  client.setCallback(messageHandler);

  Serial.println("Connecting to AWS IOT");

  while (!client.connect(THINGNAME)) {
    Serial.print(".");
    delay(100);
  }

  if (!client.connected()) {
    Serial.println("AWS IoT Timeout!");
    return;
  }

  // Subscribe to a topic
  client.subscribe(AWS_IOT_SUBSCRIBE_TOPIC);

  Serial.println("AWS IoT Connected!");
}

//void to publish the MQTT message using the Buffer Method
void publishMessage(int ArrayData[25],long ArrayId[25])
{  
  client.setBufferSize(MQTT_PACKET_SIZE);
  char jsonBuffer[2000]; //PubSubClient limits the message size to 256 bytes

  DynamicJsonDocument doc(2000); //24576
  JsonArray angka = doc.createNestedArray("No");
  JsonArray mvolt = doc.createNestedArray("mV");
  
  for(int i = 0; i < n_size ; i++){
    angka.add(ArrayId[i]);
    mvolt.add(ArrayData[i]);
  }

  serializeJson(doc,jsonBuffer); //Serialize JSON document to client
  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer); //publishing the JSON doc to the topic
}

/*Open to perform Direct Method
//void to publish the MQTT message
void publishMessage(int tempInt,long no_index)
{
  StaticJsonDocument<200> doc;
  doc["index"] = no_index;
  doc["mvolt"] = tempInt;
  char jsonBuffer[512];
  serializeJson(doc, jsonBuffer); //Serialize JSON document to client

  client.publish(AWS_IOT_PUBLISH_TOPIC, jsonBuffer);
}*/

void setup()
{
  Serial.begin(115200);

  //Initializing SD Card
  Serial.print("Initializing SD card...");
  if (!SD.begin(5)){
    Serial.println("initialization failed!");
    while (1);
  }
  Serial.println("initialization done.");

  connectAWS();
  
  /* //Open to perform Direct Method
  while (file.available() && no_index > 0) {
    String list = file.readStringUntil('\n');
    list.replace("\r","");
    list.replace("\n","");
    int tempInt= list.toInt();
    publishMessage(tempInt, no_index);
//    Serial.print(no_index);
//    Serial.print(" ");
//    Serial.println(tempInt);
    no_index++;
    delay(5);
  }
  
  file.close();
  exit(0);
  }*/

  //Performing the Buffer method, no loop
  while (no_index > 0 && file.available()) {
    String list = file.readStringUntil('\n');   //read the data as string until newline delimiter
    list.replace("\r", "");                     //to remove carriage return
    list.replace("\n", "");                     //to remove new line
    int tempInt = list.toInt();                 //converting from string to long/integer

    idArray[buff] = no_index;
    dataArray[buff] = tempInt;
    no_index++;
    
    if(buff == n_size-1){
      publishMessage(dataArray, idArray);
      memset(idArray, 0, sizeof(idArray));
      memset(dataArray, 0, sizeof(dataArray));
      buff = 0;
    }
    else{
      buff++;
    }
    delay(5);    
  }
}

void loop()
{ 

  /*//Open to perform Buffer Loop 24 hour recording
  //Opening the .txt file stored in micro SD
  File file = SD.open("/04043_1h.txt");         //reading file name
  if (!file) {
    Serial.println("Failed to open file for reading");
    return;
  }

  
  //read while the data is available
  while (no_index > 0 && file.available()) {
    String list = file.readStringUntil('\n');   //read the data as string until newline delimiter
    list.replace("\r", "");                     //to remove carriage return
    list.replace("\n", "");                     //to remove new line
    int tempInt = list.toInt();                 //converting from string to long/integer

    idArray[buff] = no_index;
    dataArray[buff] = tempInt;
    no_index++;
    
    if(buff == n_size-1){
      publishMessage(dataArray, idArray);
      memset(idArray, 0, sizeof(idArray));
      memset(dataArray, 0, sizeof(dataArray));
      buff = 0;
    }
    else{
      buff++;
    }
//    Serial.println(tempInt);  
    delay(5);    //delay to imitate 200 sps
  }
  */
}
