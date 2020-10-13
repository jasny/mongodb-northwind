for file in "$1"/*.csv
do
    filename=$(basename "$file")
    collection="${filename%.*}"
    
    echo $filename
    mongoimport -d northwind -c "$collection" --type csv --file "$file" --headerline --ignoreBlanks
done
