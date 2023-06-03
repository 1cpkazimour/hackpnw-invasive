# importing csv module
import csv

# csv file name
filename = "usdaplants_4-19-2023.csv"

# initializing the titles and rows list
fields = []
rows = []

# reading csv file
with open(filename, 'r') as csvfile:
    # creating a csv reader object
    csvreader = csv.reader(csvfile)

    # extracting field names through first row
    fields = next(csvreader)

    # extracting each data row one by one
    # for row in csvreader:
    #     rows.append(row)

    # get total number of rows
    print("Total no. of rows:", csvreader.line_num)

# printing the field names
print('Field names are:', ', '.join(field for field in fields))

# Extracting the first three columns and storing them in separate variables
column1 = [row[0] for row in rows]
column2 = [row[1] for row in rows]
column3 = [row[2] for row in rows]

pairs = [(row[1], row[35]) for row in rows]

# Print the values of the first three columns
print("Values in column 1:", column1)
print("Values in column 2:", column2)
print("Values in column 3:", column3)
