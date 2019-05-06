infile="Trees_In_Camden_Map.csv"
outfile="trees.csv"


cat $infile | cut -d, -f5,6,12,19,24,25 | awk '{print ","$1,$2,$3,$4,$5,$6}' > $outfile
