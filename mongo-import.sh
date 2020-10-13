for file in json/*.json
do
    filename=$(basename "$file")
    collection="${filename%.*}"
    
    echo $filename
    mongoimport -d "$1" -c "$collection" --type json --file "$file"
done

