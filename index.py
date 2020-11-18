from tkinter import *
from tkinter.ttk import Combobox
import urllib.request
from bs4 import BeautifulSoup
from functions import sendXmlToDatabase, listFromDirtyHtmlCode

# Функция запуска парсинга (кнопкой) в файл и его вывод в окне
def startParse():  
    adress = editPage.get()
    parsePageToFile(adress)
    readFileToTextArea()

# Парсим и сохраням в temp-файл
def parsePageToFile(adress):
    webURL  = urllib.request.urlopen(adress)
    mybytes = webURL.read()
    data = mybytes.decode("utf8")
    webURL.close()

    # Сохраняем в temp-файл в корне проекта
    fileTemp = open("avby.temp", "w", encoding = 'utf-8')
    fileTemp.write(data)
    fileTemp.close()

# Вывод из файла в окне пользователя
def readFileToTextArea():    
    textResult.delete('1.0', END)        
    fileTemp = open("avby.temp", "r", encoding = 'utf-8')
    soup = BeautifulSoup(fileTemp.read(), "lxml") # чтение из файла модулем поиска div
    fileTemp.close()        

    # Ищем div с классом listing__items и выводим в окно
#    textResult.insert(1.0, soup.find('div', 'listing__items').prettify())

    # Узнаём количество объявлений на странице
    car_advt_count = len(soup.findAll('div', 'listing-item'))

    # Создаем XML-файл
    xmlFile = open('avby.xml', 'w', encoding = 'utf-8')
    xmlFile.write('<?xml version="1.0" encoding="UTF-8"?>\n')
    xmlFile.write('<listing-items>\n')
    
    # Ищем каждое объявление
    for number in range(car_advt_count):
        adt = soup.find('div', 'listing-item').extract() # Находим и удаляем блок одного объявления при каждом цикле
        
        # Удлаяем html код, и делим по-специфичному "пробелу" этого сайта
        fullName = listFromDirtyHtmlCode(adt, 'span', 'link-text')

        # Делаем проверку на длину массива полного имени
        model = fullName[0] if len(fullName) >= 1 else ''
        series  = fullName[1] if len(fullName) >= 2 else ''
        generation = fullName[2] if len(fullName) >= 3 else ''
        
        location = adt.find('div', 'listing-item__location').text if adt.find('div', 'listing-item__location') is not None else ''

        paramsCount = len(adt.find('div', 'listing-item__params')) if adt.find('div', 'listing-item__params') is not None else 0
        year = adt.find('div', 'listing-item__params').div.extract().text if paramsCount >= 1 else ''

        engtypeParams = listFromDirtyHtmlCode(adt.find('div', 'listing-item__params').div.extract(), 'div', '') if paramsCount >= 2 else ''
        engtype = engtypeParams[0] if len(engtypeParams) >= 1 else ''
        engcapacity  = engtypeParams[1] if len(engtypeParams) >= 2 else ''
        fueltype = engtypeParams[2] if len(engtypeParams) >= 3 else ''

        mileage = adt.find('div', 'listing-item__params').div.extract().text if paramsCount >= 3 else ''
        
        price = adt.find('div', 'listing-item__price').text if adt.find('div', 'listing-item__price') is not None else ''
        priceusd = adt.find('div', 'listing-item__priceusd').text if adt.find('div', 'listing-item__priceusd') is not None else ''
        date = adt.find('div', 'listing-item__date').text if adt.find('div', 'listing-item__date') is not None else ''
            
        image = adt.img['data-srcset'].split(' ')[0] if adt.img is not None else 'https://static1.cargurus.com/gfx/reskin/no-image-available.jpg'
        urlad = adt.find('a', 'listing-item__link')['href']    

        # Пишем параметры в файл
        xmlFile.write('    <listing-item__wrap>\n')
        xmlFile.write('        <model>' + model + '</model>\n')
        xmlFile.write('        <series>' + series + '</series>\n')
        xmlFile.write('        <generation>' + generation + '</generation>\n')
        xmlFile.write('        <location>' + location + '</location>\n')
        xmlFile.write('        <year>' + year + '</year>\n')
        xmlFile.write('        <engtype>' + engtype + '</engtype>\n')
        xmlFile.write('        <engcapacity>' + engcapacity + '</engcapacity>\n')
        xmlFile.write('        <fueltype>' + fueltype + '</fueltype>\n')
        xmlFile.write('        <mileage>' + mileage + '</mileage>\n')
        xmlFile.write('        <price>' + price + '</price>\n')
        xmlFile.write('        <priceusd>' + priceusd + '</priceusd>\n')
        xmlFile.write('        <date>' + date + '</date>\n')
        xmlFile.write('        <image>' + image + '</image>\n')
        xmlFile.write('        <urlad>' + urlad + '</urlad>\n')
        xmlFile.write('    </listing-item__wrap>\n')

    xmlFile.write('</listing-items>\n')
    xmlFile.close()    

    # Выводим содержимое XML-файл в окно пользователю
    xmlFile = open("avby.xml", "r", encoding = 'utf-8')
    soup = BeautifulSoup(xmlFile.read(), "lxml")
    xmlFile.close()  
    textResult.insert(1.0, soup.prettify())


# Настройка окна
window = Tk()  
window.title("Сбор данных")  
window.columnconfigure(0, weight = 1)
window.rowconfigure(5, weight = 1)
indentLeft = 5
indentTop = 5

# Разметка виджетов
labelPage = Label(window, text="Адрес страницы:")  
labelPage.grid(column = 0, row = 0, padx = indentLeft, sticky = W)  

editPage = Entry(window, width=100)  
editPage.insert(0, 'https://cars.av.by/filter?sort=4') # Для теста сразу вставлем адрес страницы (потом убрать!, TODO)
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
scrollForText.grid(column = 2, row = 5, sticky = W+E+N+S) # W+E+N+S - это настройка выравнивая 

textResult = Text(window, height = 10, yscrollcommand = scrollForText.set)  
textResult.grid(column = 0, row = 5, columnspan = 2, padx = (indentLeft, 0), sticky = W+E+N+S) 
scrollForText.config(command = textResult.yview)

btnStart = Button(window, text="Старт!", command = startParse)  
btnStart.grid(column = 0, row = 6, padx = indentLeft, pady = indentTop, sticky = W)  

btnSendXML = Button(window, text="Отправить xml в БД", command = sendXmlToDatabase)  
btnSendXML.grid(column = 1, row = 6, padx = indentLeft, columnspan = 2, pady = indentTop, sticky = EW)  

# Main Loop
window.mainloop()
