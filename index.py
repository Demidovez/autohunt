from tkinter import *
from tkinter.ttk import Combobox

def startParse():  
    textResult.insert(1.0, editPage.get())  
  
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
editPage.grid(column = 0, row = 1, padx = indentLeft, sticky = EW) 

labelPeriod = Label(window, text="Время интервала:")  
labelPeriod.grid(column = 1, row = 0, padx = indentLeft, pady = (indentTop, 0), sticky = W)  

comboPeriod = Combobox(window) 
comboPeriod['values'] = ('10 секунд', '30 секунд', '1 минута', '5 минут', '15 минут') 
comboPeriod.current(0)
comboPeriod.grid(column = 1, row = 1, padx = indentLeft) 

labelResult = Label(window, text="Результат:")  
labelResult.grid(column = 0, row = 4, padx = indentLeft, pady = (indentTop, 0), sticky = W)  

textResult = Text(window, height = 10)  
textResult.grid(column = 0, row = 5, padx = indentLeft, columnspan = 2, sticky = W+E+N+S) 

btnStart = Button(window, text="Старт!", command = startParse)  
btnStart.grid(column = 0, row = 6, padx = indentLeft, pady = indentTop, sticky = W)  

# Main Loop
window.mainloop()