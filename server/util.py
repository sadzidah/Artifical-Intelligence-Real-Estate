# Global variables
import json
import pickle

import numpy as np

__locations = None
__data_columns = None
__model = None


def get_estimated_price(lokacija, stanje, broj_kvadrata, sprat, namjesten, broj_soba, grijanje):
    try:
        loc_index = __data_columns.index(lokacija.lower())
    except:
        loc_index = -1

    x = np.zeros(len(__data_columns))
    x[0] = stanje
    x[1] = broj_kvadrata
    x[2] = sprat
    x[3] = namjesten
    x[4] = broj_soba
    x[5] = grijanje
    if loc_index >= 0:
        x[loc_index] = 1

    return round(__model.predict([x])[0], 2)


def get_location_names():
    return __locations


def load_saved_artifacts():
    print("loading saved artifacts...")
    global __data_columns
    global __locations

    with open("./artifacts/columns.json", 'r') as f:
        __data_columns = json.load(f)['podaci_kolona']
        __locations = __data_columns[6:]


    global __model
    #if __model is None:
    with open("./artifacts/AIRE_regression.pickle", 'rb') as f:
         __model = pickle.load(f)
    print("loading artifacts is done")

def get_data_columns():
    return __data_columns


if __name__ == '__main__':
    load_saved_artifacts()
    print(get_location_names())
    print(get_estimated_price('Ilidza',1,50,4,1,1,2))
