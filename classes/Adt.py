# Класс объявления

class Adt:
    def __init__(self, model, series, generation, location, year, engtype, engcapacity, fueltype, mileage, price, priceusd, date, image, urlad):
        self.model       = model
        self.series      = series
        self.generation  = generation
        self.location    = location
        self.year        = year
        self.engtype     = engtype
        self.engcapacity = engcapacity
        self.fueltype    = fueltype
        self.mileage     = mileage
        self.price       = price
        self.priceusd    = priceusd
        self.date        = date
        self.image       = image
        self.urlad       = urlad