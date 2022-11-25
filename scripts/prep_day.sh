#!/bin/bash
DAY=$(date +'%d') 
echo $DAY

echo "Creating files for" $DAY

mkdir src/$DAY
mkdir src/$DAY/__tests__
mkdir src/$DAY/data

touch src/$DAY/$DAY.ts  
echo "import * as fs from 'fs'

const data = fs.readFileSync('./src/${DAY}/data/data.txt').toString()
" > src/$DAY/$DAY.ts


touch src/$DAY/__tests__/$DAY.test.ts  
echo "describe('Dec ${DAY}', ()=> {
    describe('Part 1', ()=> {
        //
    })
    
    describe('Part 2', ()=>{
        //
    })
})" > src/$DAY/__tests__/$DAY.test.ts

touch src/$DAY/data/data.txt