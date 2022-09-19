import os 

os.chdir("_essais")

for file in os.listdir():
    newname = "-".join(file.split("-")[3:])
    print(file, newname)
    
    os.rename(file, newname)