from os import listdir
from lxml import etree
import json
import time
import numpy as np
from scipy.stats import ttest_ind

xmlPath = 'XML/'
jsonPath = 'JSON/'


def testBatchXML():
	startTime = time.time()
	for file in listdir(xmlPath):
		with open(xmlPath+file, 'r') as xmlFile:
			xmlString = bytes(xmlFile.read(), 'utf-8')
		x = etree.fromstring(xmlString)
		string = etree.tostring(x)
		del xmlString, x, string
	return time.time() - startTime

	
def testBatchJSON():
	startTime = time.time()
	for file in listdir(jsonPath):
		with open(jsonPath+file, 'r') as jsonFile:
			jsonString = jsonFile.read()
		j = json.loads(jsonString)
		string = json.dumps(j)
		del jsonString, j, string
	return time.time() - startTime

	
nbIter = 1000
timesXML = []
timesJSON = []

for i in range(nbIter):
	if i%(nbIter//100) == 0 and i != 0:
		print('{}%'.format(i*100//nbIter))
	timesXML.append(testBatchXML())
	timesJSON.append(testBatchJSON())
	
print('lxml.etree, json, {} iterations, 3 sigma'.format(nbIter))
print('XML:  {:.3f} s +/- {:.3f}'.format(np.mean(timesXML), 3*np.std(timesXML)))
print('JSON: {:.3f} s +/- {:.3f}'.format(np.mean(timesJSON), 3*np.std(timesJSON)))

t, p = ttest_ind(timesXML, timesJSON, equal_var=False)
print('p-value: {}'.format(p))
