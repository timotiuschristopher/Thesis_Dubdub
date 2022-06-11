# Nested Array to Basic Array Converted CSV
# by: T.C. Tantokusumo
# 2022

# Importing Libraries
import csv
import pandas as pd 

#import file to pandas dataframe
df = pd.read_csv('test_1h.csv')
print(df)

#Stacking the dataframe
stack_data = df.stack().reset_index()
print(stack_data)

#Filter the "No" data
id = stack_data.loc[stack_data['level_1'].str.contains("No/", case=False)]
id_data = id.iloc[:,2].reset_index(drop=True)
print(id_data)

#Filter the "mV" data
mV = stack_data.loc[stack_data['level_1'].str.contains("mV/", case=False)]
mV_data = mV.iloc[:,2].reset_index(drop=True)
print(mV_data)

#Inserting the filtered data into a new dataframe
newdf = pd.DataFrame()
entry_No = newdf.insert(loc=0,column="No", value=id_data)
entry_mV = newdf.insert(loc=1,column="mV", value=mV_data)
print(newdf)

#Exporting the new dataframe to .csv file
newdf.to_csv("output_1h.csv",index=False)