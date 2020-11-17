import mysql.connector
from bs4 import BeautifulSoup
from classes.Adt import Adt

def sendXmlToDatabase():  
    # #Подключаемся к нашей базе данных
    # connection = mysql.connector.connect(host='', database='', user='', password='')

    # #Создаем курсор
    # cursor = connection.cursor()

    # #Отбираем все строки из таблицы test
    # query = 'select * from test;'
    # cursor.execute(query)
    # res = cursor.fetchall()

    # #Закрываем курсор и подключение к БД              
    # cursor.close()
    # connection.close()

    # Открываем XML файл
    fileTemp = open("avby.xml", "r", encoding = 'utf-8')
    # Удаляем переводы строк и пробелы
    pureXml = "".join(line.strip() for line in fileTemp.read().split("\n"))
    # Грузим содержимое в soup
    soup = BeautifulSoup(pureXml, "lxml")
    fileTemp.close()   

    # Узнаём количество объявлений в XML
    advtCount = len(soup.findAll('listing-item__wrap'))
    # Помещаем каждое объявление в элемент списка
    adtList = list(range(advtCount))

    for number in range(advtCount):
        # Находим объявление и удаляем тег одного объявления при каждом цикле
        item = soup.find('listing-item__wrap').extract()   

        # Создем объект класса Adt (Объявление) и добавляем в список
        adtList[number] = Adt(
            item.model.text, 
            item.series.text, 
            item.generation.text, 
            item.location.text, 
            item.year.text, 
            item.engtype.text, 
            item.engcapacity.text, 
            item.fueltype.text, 
            item.mileage.text, 
            item.price.text, 
            item.priceusd.text, 
            item.date.text, 
            item.img.text, 
            item.urlad.text
        )     

        # Для дебага, потом убрать!
        print(adtList[number].model, adtList[number].series, adtList[number].generation, adtList[number].location, adtList[number].year, adtList[number].engtype, adtList[number].engcapacity, adtList[number].fueltype, adtList[number].mileage, adtList[number].price, adtList[number].priceusd, adtList[number].date, adtList[number].img, adtList[number].urlad)      

def listFromDirtyHtmlCode(soup, tag, classTag):
    if not classTag:
        resultList = str(soup).replace('<' + tag + '>', '').replace('</' + tag + '>', '').replace('\xa0', ' ').replace(' · ', ' ').replace(',', '').split('<!-- --> <!-- -->')
    else:
        resultList = str(soup.find(tag, classTag)).replace('<' + tag + ' class="' + classTag + '">', '').replace('</' + tag + '>', '').replace('\xa0', ' ').replace(' · ', ' ').replace(',', '').split('<!-- --> <!-- -->')
    
    

    return resultList