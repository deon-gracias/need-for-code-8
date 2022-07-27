import pandas as pd
import requests
import random

duplicates = dict()

dataDf = pd.read_json("./data.json")


print(dataDf.columns)
print(dataDf.head())


for d in dataDf.itertuples():
    data = {
        'id': d.asin,
        'name': d.Category.split('_')[0],
        'category': d.Category,
        'price': random.randint(100, 10000)
    }

    review = {
        'name': d.reviewText,
        'rating': d.overall,
        'comment': d.summary
    }

    if d.asin not in duplicates.keys():
        res = requests.post("http://localhost:5000/products", json=data)
        resData = res.json()['data']
        print(resData)
        duplicates[d.asin] = resData['_id']

    res = requests.post(
        "http://localhost:5000/products/{}/reviews".format(duplicates[d.asin]), json=review)

    print(d)
