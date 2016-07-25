# Given... when... then.
# Think in user stories
# You only have to test the parts you want to work
# Write tests for the happy path, then the unhappy paths, the edge cases, then bugs that pop up

# Fundamental hierarchy
# * spec file           spec_file.rb
# ** example group      describe
# *** nested group      describe / context
# **** example          it
# ***** expectations    expect().to()
require 'rspec'
require 'thing_to_test.'

describe 'thing' do
  describe '.method' do
    it 'returns an array of colors names' do
      # expectations
    end
    puts 'Will output to the console'
    context 'when some other thing happens' do
      # all tests included here test some condition, usually an unhappy or default path
      it 'sends default values when no arguments are passed' do
        # here's a test
      end
    end
  end
end

# Expections
# ==========

expect('something here').to matcher
expect('something here').to_not matcher

# Matchers
# ========
#
# Matchers are passed as arguments to .to()

# Equivalence matchers
describe 'equivalence matchers' do
  it 'will use type coercion to match #eq' do
    a = '2 cats'
    b = '2 cats'
    expect(a).to eq(b)
    expect(a).to be == b

    c = 17
    d = 17.0
    expect(c).to eq(d)
  end

  it 'will not use type corection to match #eql' do
    a = '2 cats'
    b = '2 cats'
    expect(a).to eql(b)

    c = 17
    d = 17.0
    expect(c).to eql(d)
  end

  it 'will match identity equality with #equal' do
    a = '2 cats'
    b = '2 cats'
    expect(a).not_to equal(b)

    c = b
    expect(b).to equal(c)
    expect(b).to be(c) # synonym
  end
end

# Truthiness matchers

describe 'truthiness matchers' do
  it 'will match true/false' do
    expect(1 < 2).to be true # be_true deprecated
    expect(1 > 2).to be false # be_false deprecated

    expect('a string').not_to be true
    expect(nil).not_to be false
    expect(0).not_to be false # 0 is not false in Ruby!
  end

  it 'will match truthy/falsey' do
    expect(1 < 2).to be_truthy
    expect(1 > 2).to be_falsey

    expect('a string').to be_truthy
    expect(nil).to be_falsey
    expect(0).not_to be falsey # 0 is not falsey in Ruby!
  end

  it 'will match nil' do
    expect(nil).to be nil
    expect(false).not_to be nil
    expect(0).not_to be nil
  end
end

# Numeric matchers

describe 'numeric comparison matchers' do
  it 'will match less than/greater than' do
    expect(10).to be > 9
    expect(10).to be >= 10
    expect(10).to be <= 10
    expect(9).to be < 10
  end

  it 'will match numeric ranges' do
    expect(10).to be_between(5, 10).inclusive
    expect(10).not_to be_between(5, 10).exclusive
    expect(10).to be_within(1).of(11)
    expect(5..10).to cover(9)
  end
end

# Collections
# Arrays, hashes, and strings

describe 'collection matchers' do
  it 'will match arrays' do
    array = [1, 2, 3]

    expect(array).to include(3)
    expect(array).to include(1, 3)

    expect(array).to start_with(1)
    expect(array).to end_with(3)

    expect(array).to match_array([3, 2, 1])
    expect(array).not_to match_array([1, 2]) # missing 3

    expect(array).not_to contain_exactly(1, 2)
  end

  it 'will match strings' do
    string = 'some string'

    expect(string).to include('ring')
    expect(string).to include('so', 'ring')

    expect(string).to start_with 'so'
    expect(string).to end_with 'ring'
  end

  it 'will match hashes' do
    hash = { a: 1, b: 2, c: 3 }

    expect(hash).to include(:a)
    expect(hash).to include(b: 2)

    expect(hash).to include(a: 1, c: 3)
    expect(hash).to include({ :a => 1, c: 3 })

    expect(hash).not_to include({ 'a' => 1, 'c' => 2 })
  end
end

# Regex matcher

expect(string).to match(/s[ome]\s$(rege)x?/)

# Object type matcher

expect(@thing).to be_an_instance_of(SomeClass) # test direct subclassing
expect(@thing).to be_a_kind_of(SomeClass) # test for inheritance anywhere/anyhow in the hierarchy, including modules
expect(@thing).to be_a(SomeClass) # alias for be_a_kind_of
expect(@thing).to be_an(ArbitraryClass) # alias for be_a that improves readability

# Respond to matcher

expect(@thing).to respond_to(:function)

# Attribute matcher

expect(@thing).to have_attributes(first_name: 'Bob', last_name: 'Jones')

# Satisfy matcher
# Catch all

expect(@anything).to satisfy { |thing| thing == some_other_thing } # Anything that returns true will satisfy the matcher

# Predicate matchers
# Dynamically generates matchers based on naming convention

expect(some_object).to be_nil # #be_nil doesn't actually exist, it's being generated dynamically by Rspec, removing the be_ and calling some_object.nil?
expect(some_object).to have_key(:a) # same concept, but generates a test calling some_object.has_key?(:a)

# This works with custom methods - VERY POWERFUL

expect(my_object).to be_silly_willy # calls my_object.silly_willy?
expect(my_object).to have_hard_luck # calls my_object.has_hard_luck?

# Observation matchers

array = []
expect { array << 1 }.to change(array, :empty).from(true).to(false)

expect do
  bob.first_name = 'Robert'
  bob.last_name = 'Jones'
end.to change(bob, :full_name).from('Bob Jones').to('Robert Jones')

# expect and #change can take a block as well

x = 11
expect { x += 1 }.to change { x % 3 }.from(2).to(0)

# relative modifier
expect { x += 1 }.to change { x }.by(1)

# Observe errors
expect { customer.delete }.to raise_error
expect { customer.delete }.to raise_exception
expect { 1 / 0 }.to raise_error(ZeroDivisionError)
expect { 1 / 0 }.to raise_error.with_message('divided by 0')

# Observe output
expect { print 'hello' }.to output.to_stdout
expect { print 'hello' }.to output('hello').to_stdout

# Complex expectations
# and
expect('string').to start_with('s').and end_with('g')
expect('string').to start_with('s') & end_with('g')

# or
expect(someNumber).to be_even.or be_odd
expect(someOtherNumber).to be_even | be_odd

# Composing matcher
# Some matchers can accept other matchers as their arguments
expect(someArray).to all(be < 5)
expect(@items).to all(be_visible & be_in_stock)

expect(someArray).to start_with(start_with(2))

# noun-phrase aliases
expect(someString).to start_with(a_string_that_starts_with('a'))

# a_string_ending_with
# a_string_matching
# a_value
# a_value_within

# Hooks
# Requires using instance variables to make information available from hooks in examples

before(:context) do
  # called before each 'describe' block
end

before(:example) do
  # called before each 'it' block within the context scope
  @something = Something.new
end

# The Let method
# Used to setup variables. Preferable to using hooks. Let only gets called if needed and takes care of scope.

# Workaround using before hook - "Memoization"
before(:context) do
  def car
    @car ||= Car.new
  end
end

it 'allows reading for :wheels' do
  expect(car.wheels).to eq(4)
end

# Better...
let(:car) { Car.new } # symbol becomes a variable with whichever value gets returned from code block

it 'allows reading for :wheels' do
  expect(car.wheels).to eq(4)
end

# car only gets loaded if needed

let!(:car) { Car.new } # loaded immediately

# Set a subject
# Just like let and let!, but subject is a naming convention commonly used for the variable being tested in a context

subject { Car.new }
subject! { Car.new }

it 'allows reading for :wheels' do
  expect(subject.wheels).to eq(4)
end

# Implicit subjects
# If you use a classname instead of a string for a describe block, you get a subject call automatically

describe Car do
  it 'allows reading for :wheels' do
    expect(subject.wheels).to eq(4) # Automatically calls subject { Car.new }
  end
end

# Shared examples
# We can abstract common tests away into a shared example.
shared_examples_for('a standard object') do
  it 'does a thing' do
    expect(subject.attribute).to eq('ding dong diddy') # subject is implicitly defined
  end
end

# Put this in a separate file and require it in
require 'support/shared_examples.rb'
# Can be required in spec_helper, but that will load the shared example for every test, whether it's needed or not.

# Run the test
describe SomeClass do
  it_behaves_like 'a standard object'
end

# Local variables other than subject can be populated in two ways...
# 1) By defining them in a code block that gets called in the spec

described SomeClass do
  it_behaves_like 'a standard object' do
    collection_of_stuff = ['stuff', 'more stuff', 'too much stuff', 'stuff party']
  end
end

# 2) Created in a call to let within the shared example

shared_examples_for('a standard object') do
  let(:collection) { ['stuff', 'more stuff', 'too much stuff', 'stuff party'] }

  it 'does a thing' do
    expect(subject.attribute).to eq('ding dong diddy') # subject is implicitly defined
  end
end

# Test doubles
# Any object used in testing that stands in for another object
# Double/mock - a simple object preprogrammed with expecations and responses as preparation for the calls it will receive; "double" in rspec
# Stub - an instruction to an object to return a specific response to a method call; "allow" in rspec

describe 'Doubles' do
  it 'allows stubbing methods' do
    dbl = double('Name of the double')
    allow(dbl).to receive(:hey!)
    expect(dble).to respond_to(:hey!)
  end

  it 'allows stubbing a response with a block' do
    dbl = double('Name of the double')
    allow(dbl).to receive(:hey!) { 'Response' }
    expect(dbl.hey!).to eq('Response')
  end

  it 'allows stubbing responses with #and_return' do
    dbl = double('Name of the double')
    allow(dbl).to receive(:hey!).and_return('Response')
    expect(dbl.hey!).to eq('Response')
  end

  it 'allows stubbing multiple methods with hash syntax' do
    dbl = double('Person')
    allow(dbl).to receive_messages(full_name: 'Mary Jones', initials: 'MTS')
    expect(dbl.full_name).to eq('Mary Jones')
    expect(dbl.initials).to eq('MTS')
  end

  it 'allows stubbing with a hash argument to #double' do
    dbl = double('Person', full_name: 'Mary Jones', initials: 'MTS')
    expect(dbl.full_name).to eq('Mary Jones')
    expect(dbl.initials).to eq('MTS')
  end

  it 'allows stubbing multiple responses with #and_return' do
    die = double('Die')
    allow(die).to receive(:roll).and_return(1, 5, 2, 6)
    expect(die.roll).to eq(1)
    expect(die.roll).to eq(5)
    expect(die.roll).to eq(2)
    expect(die.roll).to eq(6)
    expect(die.roll).to eq(6)
  end
end

# Partial test doubles
# A regular object with some features of a double

descr
ibe 'Partial test doubles' do
  it 'allows stubbing instance methods on Ruby classes' do
    time = Time.new(2010, 1, 1, 12, 0, 0)
    allow(time).to receive(:year).and_return(1975)

    expect(time.to_s).to eq('2010-01-01 12:00:00 -0500')
    expect(time.year).to eq(1975)
  end

  it 'allow stubbing instance methods on custom classes' do
    # Stubs always override declared methods
    class SuperHero
      attr_accessor :name
    end

    hero = SuperHero.new
    hero.name = 'Superman'
    expect(hero.name).to eq('Superman')

    allow(hero).to receive(:name).and_return('Clark Kent')
    expect(hero.name).to eq('Clark Kent')
  end

  it 'allows stubbing class methods on Ruby classes' do
    fixed = Time.new(2010, 1, 1, 12, 0, 0)
    allow(time).to receive(:now).and_return(fixed)

    expect(Time.now).to eq(fixed)
    expect(Time.now.to_s).to eq('2010-01-01 12:00:00 -0500')
    expect(Time.now.year).to eq(2016) # Does not override other class methods
  end

  it 'allows stubbing database calls on a mock object' do
    #
    class Customer
      attr_accessor :name
      def self.find
        # database lookup, returns one object
      end
    end

    dbl = double('Mock customer')
    allow(dbl).to receive(:name).and_return('Bob')
    allow(Customer).to receive(:find).and_return(dbl)

    customer = Customer.find
    expect(customer.name).to eq('Bob')
  end

  it 'allows stubbing database calls with many mock objects' do
    #
    class Customer
      attr_accessor :name
      def self.all
        # database lookup, returns an array of objects
      end
    end

    c1 = double('First Customer', name: 'Bob')
    c2 = double('Second Customer', name: 'Mary')
    allow(Customer).to receive(:all).and_return([c1, c2])

    customers = Customer.all
    expect(customers[1].name).to eq('Mary')
  end
end

# Message expectations
# Set what the message can receive and set the test expectation in one line

expect(dbl).to receive(:hey!).and_return('Ho!')

dbl.hey! # Must be called afterwards

# Order doesn't matter

expect(dbl).to receive(:step_1)
expect(dbl).to receive(:step_2)

dbl.step_2
dbl.step_1

# Set the order exxplicitly

expect(dbl).to receive(:step_1).ordered
expect(dbl).to receive(:step_2).ordered

dbl.step_2 # FAIL!
dbl.step_1

# Message argument constraints

expect(dbl).to receive(:sort).with(any_args) # default
expect(dbl).to receive(:sort).with('name')
expect(dbl).to receive(:sort).with(no_args)
expect(dbl).to receive(:sort).with(1, 'second', 'fun')
expect(dbl).to receive(:sort).with('Any matcher')

# Message count constriants

expect(post).to receive(:like).exactly(3).times
expect(post).to receive(:like).once
expect(post).to receive(:like).twice # also at_least..., at_most...

# Spies
# Spies keep track of messages received and can 'play back' the record. Spies allow unstubbed methods to be passed through, too. They take the same syntax and constraints as stubs. The key difference is that spies keep that record of methods sent to the object.
dbl = spy('name of spy')
allow(dbl).to receive(:hey!).and_return('ho!')
dbl.hey!
expect(dbl).to have_received(:hey!)
