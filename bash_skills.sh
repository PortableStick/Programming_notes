#!/bin/bash
#This signifies that the script should be interpreted with bash

###variables
a=5 #no spaces
echo $a #use $ to reference

###strings
#Text written in the script is a string by default
#It can be wrapped in hard quotes '', which escape special characters but allow spaces
#Strings can also be wrapped in double quotes, which allows us to use variables in the strings
echo "a is $a"

###brace expansion
echo {1..100} #1 through 100
echo {01..100} #001 through 100
echo {01..100..2} #001 through 100 every 2 numbers

###conditionals
if [ $a -gt 4 ]; then #notice the spaces in the brackets
    echo $a is greater than 4!
else
    echo $a is not greater than 4!
fi

###extended test notation
b = "This is a string"
if [[ $b =~ [0-9]+ ]]; then #double brackets
    echo "There are numbers in the string: $b"
else
    echo "There are no numbers in the string: $b"
fi

###while/until loops
i=0
while [ $i -le 10 ]; do
    echo i:$i
    ((i+=1))
done

j=0
until [ $j -ge 10 ]; do
    echo j:$j
    ((j+=1))
done

###for loops
for k in 1 2 3
do
    echo $k
done

for (( l=0; l<=10; l++ ))
do
    echo $l
done

###aray loops
arr=("thing1" "thing2" "thing3")
for i in ${arr[@]}
do
    echo $i
done

declar -A arr
arr["name"]="myName"
arr["id"]="1111"
for i in "${arr[@]}"
do
    echo "$i: ${arr[$i]}"
done

###command substitution in loops
for i in $(ls)
do
    echo "$i"
done

###case
a="dog"
case $a in
    cat) echo "Feline";;
    dog|puppy) echo "Canine";;
    *) echo "No match!";;
esac

###functions
function myFunction {
    echo "Here is function logic"
}

myFunction #call it

function functionWithParams {
    echo "$1 is the first argument, $2 the second"
}

functionWithParams This "and this"

function numberThings {
    i=1
    for f in $@; do #$@ all positional parameters
        echo $i: $f
        (($i+=1))
    done
}

numberThings $(ls)

##Script arguments
#Exactly the same as with functions
#$1, $2, $3, etc...
#Also includes $@, an array of all arguments
#'$#' is the number of arguments


###Flags
#Get flags with the getopts function
while getopts u:p: option; do #gets the flags and their values, sets all to 'option'
    case $option in 
        u) user=$OPTARG;;
        p) pass=$OPTARG;;
        ?) echo "This isn't used!"
    esac
done

#This would run:
#./my.sh -u Me -p my_password -z ("This isn't used!")

###Getting input during execution
echo "Ask the user a question"
read answer
echo "your answer was $answer"

echo "Ask for secret information"
read secretAnswer -s

read -p "Do it all in one line" simpleAnswer

###Menu
select animal in "cat" "dog" "bird" "fish"
do
    echo "You selected $animal"
    break
done

# 1) cat
# 2) dog
# 3) bird
# 4) fish
# #?

###Input error handling
#Guard clause
if [[ $# -lt 3 ]]; then
    #set default variable assignments
else
    #execute normally
fi

#Loop until user enters correct amount of info
read -p "Please input"
while [[ -z "$a" ]]; do
    read -p "Must answer! " a
done
echo "$a is your input"