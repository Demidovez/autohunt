from bs4 import BeautifulSoup
import requests
import json

def sendXmlToDatabase():  
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
        adtList[number] = {
            'model': item.model.text, 
            'series': item.series.text, 
            'generation': item.generation.text, 
            'location': item.location.text, 
            'year': item.year.text, 
            'engtype': item.engtype.text, 
            'engcapacity': item.engcapacity.text, 
            'fueltype': item.fueltype.text, 
            'mileage': item.mileage.text, 
            'price': item.price.text, 
            'priceusd': item.priceusd.text, 
            'date': item.date.text, 
            'image': item.image.text, 
            'urlad': item.urlad.text
        }     

    requests.post('http://82.146.46.106:5000/save_adt', json=json.dumps(adtList))     

def listFromDirtyHtmlCode(soup, tag, classTag):
    if not classTag:
        resultList = str(soup).replace('<' + tag + '>', '').replace('</' + tag + '>', '').replace('\xa0', ' ').replace(' · ', ' ').replace(',', '').split('<!-- --> <!-- -->')
    else:
        resultList = str(soup.find(tag, classTag)).replace('<' + tag + ' class="' + classTag + '">', '').replace('</' + tag + '>', '').replace('\xa0', ' ').replace(' · ', ' ').replace(',', '').split('<!-- --> <!-- -->')
    
    

    return resultList