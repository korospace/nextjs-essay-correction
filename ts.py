def stemming(query):
  #Proses Stemming dokumen
  #Membuat Stemmer
  factory = StemmerFactory()
  stemmer = factory.create_stemmer()
  #Stemming
  output = stemmer.stem(query)
  return output
def filtering_stopword(query):
  #Membersihkan stopword
  factory = StopWordRemoverFactory()
  stopword = factory.create_stop_word_remover()
  output = stopword.remove(query)
  return output
def stemming_filtering_query(query):
  #Stemming query dan filtering stopword
  query_clean = filtering_stopword(query)
  query_stemmed = stemming(query_clean)
  return query_stemmed.split()

def lev(typo, bener):
  #Menghitung Levenshtein Distance dan tingkat
  kemiripan kedua string
  typo1 = "#" + typo
  bener1 = "#" + bener
  matriks = [[0 for i in range(len(bener1))]for j in
  range(len(typo1))]
  for i in range(len(typo1)):
  for j in range(len(bener1)):
  if(min(i,j) == 0):
  matriks[i][j] = max(i,j)
  else:
  a = matriks[i-1][j] + 1
  b = matriks[i][j-1] + 1
  c = matriks[i-1][j-1]
  if(typo1[i] != bener1[j]):
  c+=1
  matriks[i][j] = min(a,b,c)
  distance = matriks[len(typo1)-1][len(bener1)-1]
  return distance / max(len(typo1)-1, len(bener1)-1)