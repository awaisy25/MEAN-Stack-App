'''
using python and pymongo to do statiscal analysis with the mongo db database
these values will be extracted through node
'''
import pymongo
#need to import ssl for TLS/SSL support to mongodb connection
import ssl
import sys
import json
from collections import Counter
#connecting with ssl and extracting data
client = pymongo.MongoClient("mongodb+srv://awais:dragonballz1@mstackcluster-hwzch.mongodb.net/test?retryWrites=true&w=majority"
, ssl=True, ssl_cert_reqs=ssl.CERT_NONE)
db = client["angular-Data"]
collection = db["posts"]
#Extracting all of the data & placing it in counter
cnt = Counter()
for x in collection.find():
  cnt[x['title']] += 1
  for i in x['content'].split():
    cnt[i] += 1
#retrieving the top 5 & placing it in a counter
TopFive = dict((cnt.most_common(5)))
TopFive.update({"_id": 1})
# getting the current value from datababse & replacing it with new one
newCollection = db["TopFive"]
newCollection.find_one_and_replace({"_id" : 1}, TopFive)
print("Success in updating Top five to database")



