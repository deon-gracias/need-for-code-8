from flask import Flask, request, jsonify
import pandas as pd
from sklearn.decomposition import TruncatedSVD
import numpy as np
app = Flask(__name__)

data=pd.read_json('need-for-code-8/ml-model-api/data.json')
ratings_matrix=pd.read_csv('imp.csv')
X=ratings_matrix.T
SVD=TruncatedSVD(n_components=10)
decomposed_matrix = SVD.fit_transform(X)
correlation_matrix = np.corrcoef(decomposed_matrix)

def predict(i):
    product_names = list(X.index)
    product_ID = product_names.index(i)
    #     product_ID
    correlation_product_ID=correlation_matrix[product_ID]
    correlation_product_ID
    Recommend = list(X.index[correlation_product_ID > 0.65])

    # Removes the item already bought by the customer
    Recommend.remove(i)

    print(Recommend[0:10])
    return Recommend[0:10]

@app.route("/recomendation", methods=["GET","POST"])
def ptest():
    # For recomendation
   product = request.get_json()
   predict(product)
   return data
@app.route("/dataset",methods=["GET","POST"])
def data():
    # for viewing the dataset
    return data.to_json(orient='columns')
if __name__ == "__main__":
   app.run(debug=True,port=5001,use_reloader=False)