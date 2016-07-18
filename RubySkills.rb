#Variables
my_var = "A thing"
#Conditional assignment - assign only if nil
my_var ||= "Another thing"
#no semicolon, variable keyword, or type
"String".downcase #calls the function on the string object, no parens
#control flow
if number > 2
  #do stuff!  Notice 2 space indent
elsif number < 2
  #do other stuff!
end #must end

# strings
this_string = "I will not escape special characters, so you can #{interpolate}"
another_string = 'I will escape characters.  No #{interpolation} for you!'
this_string = %Q(Functional example of interpolating #{string}) # doesn't have to be (), can be any? character
another_string = %q(Notice the lower-case #{q})

# Double quotes will also preserve whitespace
multi_line_string = "Here
is some
#{whitespace}"

#heredoc
alternate_multi_line_string = <<-STRING
this is a
string #{with}
some whitespace
STRING

# Whitespace characters
# /t /n /s
#Alternatively...
unless number > 2
  #do stuff
else
  #other stuff
end

#unless can be used with functions/expressions
puts "I'm true" unless false

#Ruby does NOT use ++, --, etc

#For loops
for var in 1...10 #notice the variable declaration and exclusive spread operator (...)
  puts var
end

exclusive_spread = "..."
inclusive_spread = ".."

#Loop loops
loop do
  #block of code
  break if true
  next if false
end

#code blocks
#First way
do |placeholder|
  #stuff
end

#Second way
{ |placeholder|
  #stuff
}

#Times operator!
10.times {
  #do stuff!
}

#Until!
j = 0
until j == 51 do #check happens before each iteration, will print 1..50
  print j
  j += 1
end

#Hashes (JS objects, Python dicts)
super_hash = {
  "first name" => "Greg",
  "last name" => "Smith",
  "age" => "too old"
}

other_hash = Hash.new(0) #set default value

print super_hash["first name"] #"Greg"

super_hash.each {|key, value|
  puts "#{key}: #{value}" # # for string template variable
}

#Functions
def function(param)
  #do stuff
end

#functions that have a ! in the name modify the array they are called on
#functions with ? in the name return a boolean

#Splat parameter
def anotherFunction(*stuff)
  #stuff is an array of arguments
end

#In Ruby, false and nil are “falsy”, while all other values are “truthy”
#
#Combined comparison operator!
thing1 = "A"
thing2 = "Z"

thing1 <=> thing2 #returns 0 if equal, 1 if thing1 is greater, -1 if thing2 is greater

#Symbols
menagerie = {
  :foxes => 2,
  :giraffe => 1,
  :weezards => 17,
  :elves => 1,
  :canaries => 4,
  :ham => 1
}

#Each symbol of the same name will always refer to the same object, whereas two strings with identical content will refer to different objects

puts "string".object_id #15486280
puts "string".object_id #15485880

puts :symbol.object_id #319528
puts :symbol.object_id #319528

#This makes symbols ideal for hashes as they will ultimately take less memory.  They are also immutable.
#There are two related methods, string.to_sym (string.intern) and symbol.to_s, which switch between strings and symbols.
#Method names are also referenced interally as symbols. The method #responds_to? takes a symbol and returns a boolean indicating whether the object responds to that method call.
#ex: "A string".responds_to?(:intern) #returns true


#Ruby 1.9 introduced a new syntax for symbols in hashes, making it more familiar and easier to type
garbage = {
  thing1: "I'm a thing!",
  thing2: true
}

#Simpler if
start = true
for i in 1..20
  puts i
end if start

#Case
case variable
  when "Something!" then puts "Something else"
  when 25
    print "lkajsdflkjs!"
  else puts "Some default behavior"
end

#concatenation!
#Use the shovel as a shortcut for += (strings) or array#push
some_array = [1,2,3]
some_array << 4 # [1,2,3,4]

#Yield!
#Functions have a way of delegating control to code blocks passed to it. This is done using the yield keyword.
def super_function
  #does function stuff
  yield
  #does more function stuff
end

super_function do
  #block stuff
  end

#We can pass parameters around, too
def another_function(param)
  yield("Constant!")
  yield(param)
end

another_function do |param|
  puts param
end

#Procs are saved code blocks
multiples_of_3 = Proc.new do |n|
  n % 3 == 0
end

(1..100).to_a.select(&multiples_of_3)

#Procs can be called directly, too
puts multiples_of_3.call(1..100)

#Symbols that refer to object methods can be converted into procs
[1,2,3].collect!(&:to_s) #returns ["1", "2", "3"]

#Lambdas are basically Procs
new_lambda = lambda { |args| puts "Do stuff"  }
#There are two major differences
#1) When a lambda returns, it returns control to the calling function. Procs simply return without going back to the calling function
#2) Lambdas check the number of arguments it's passed and will throw an error if it gets the wrong number

#Class syntax
class Person < Mammal #subclassing
  $species = "Human" #$ makes it global var
  @@population = 0 #@@ makes it class var
    def initialize(name)
        super
        @name = name #@ makes it an ivar
        @@population += 1
    end

  public
    def getName; @name; end
  private
    def think
      #churn wheels
    end
end

matz = Person.new("Yukihiro") #constructor call
puts "#{matz.population}" #1

#Accessor methods
class thingy
  def initialize(param)
    @param = param
  end

  def param
    @param  #getter for @param
  end

  def param=(param) #returns argument rather than last statement in method
    #setter logic here
  end
end

#accessor shorthands
class thingy
  attr_reader :param #writes getter as above
  attr_writer :param #writes setter as above
  def initialize(param)
    @param = param
  end
end

#even shorter-hand
class thingy
  attr_accessor :param #does both
  def initialize(param)
    @param = param
  end
end

#Modules
module Circle

  PI = 3.141592653589793

  def Circle.area(radius)
    PI * radius**2
  end

  def Circle.circumference(radius)
    2 * PI * radius
  end
end

#modules can be added with require 'module'
#also, they can be included in classes, bringing the module's methods and properties into the class's namespace

class Angle
  include Math
  attr_accessor :radians

  def initialize(radians)
    @radians = radians
  end

  def cosine
    cos(@radians)
  end
end

acute = Angle.new(1)
acute.cosine

#scope resolution operator (::)
Circle::PI

#Classes can be extended by modules with the extend keyword
#This brings the module in as static properties and methods

module ThePresent
  def now
    puts "It's #{Time.new.hour > 12 ? Time.new.hour - 12 : Time.new.hour}:#{Time.new.min} #{Time.new.hour > 12 ? 'PM' : 'AM'} (GMT)."
  end
end

class TheHereAnd
  extend ThePresent
end

TheHereAnd.now