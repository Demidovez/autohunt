from tkinter import *
from tkinter.ttk import Combobox
import urllib.request
from bs4 import BeautifulSoup

def startParse():  
    adress = editPage.get()
    #parsePageToFile(adress)
    readFileToTextArea()

def parsePageToFile(adress):
    webURL  = urllib.request.urlopen(adress)
    mybytes = webURL.read()
    data = mybytes.decode("utf8")
    webURL.close()

    fileTemp = open("avby.temp", "w", encoding = 'utf-8')
    fileTemp.write(data)
    fileTemp.close()

def readFileToTextArea():   
    textResult.delete('1.0', END)        
    fileTemp = open("avby.temp", "r", encoding = 'utf-8')
    soup = BeautifulSoup(fileTemp.read())
    fileTemp.close()        

    textResult.insert(1.0, soup.prettify())
   
  
# Config of window
window = Tk()  
window.title("Сбор данных")  
window.columnconfigure(0, weight = 1)
window.rowconfigure(5, weight = 1)
indentLeft = 5
indentTop = 5

# Layout
labelPage = Label(window, text="Адрес страницы:")  
labelPage.grid(column = 0, row = 0, padx = indentLeft, sticky = W)  

editPage = Entry(window, width=100)  
editPage.insert(0, 'https://cars.av.by/filter?sort=4') # FOR DEBUG
editPage.grid(column = 0, row = 1, padx = indentLeft, sticky = EW) 

labelPeriod = Label(window, text="Время интервала:")  
labelPeriod.grid(column = 1, row = 0, padx = indentLeft, pady = (indentTop, 0), sticky = W)  

comboPeriod = Combobox(window) 
comboPeriod['values'] = ('10 секунд', '30 секунд', '1 минута', '5 минут', '15 минут') 
comboPeriod.current(0)
comboPeriod.grid(column = 1, row = 1, padx = indentLeft, columnspan = 2) 

labelResult = Label(window, text="Результат:")  
labelResult.grid(column = 0, row = 4, padx = indentLeft, pady = (indentTop, 0), sticky = W)  

scrollForText = Scrollbar(window, width = 1)
scrollForText.grid(column = 2, row = 5, sticky = W+E+N+S)

textResult = Text(window, height = 10, yscrollcommand = scrollForText.set)  
textResult.grid(column = 0, row = 5, columnspan = 2, padx = (indentLeft, 0), sticky = W+E+N+S) 
scrollForText.config(command = textResult.yview)

btnStart = Button(window, text="Старт!", command = startParse)  
btnStart.grid(column = 0, row = 6, padx = indentLeft, pady = indentTop, sticky = W)  

# Main Loop
window.mainloop()