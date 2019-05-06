infile="National_Statistics_Postcode_Lookup_Camden.csv"
outfile="postcodes.csv"


cat $infile | cut -d, -f1,31,32 | awk '{print ","$1,$2}' > $outfile
