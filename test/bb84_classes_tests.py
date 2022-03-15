
import unittest
import sys
import os

sys.path.append(os.path.dirname(os.path.realpath(__file__)) + '/../src')

from bb84.participant import Participant
from bb84.sender import Sender
from bb84.reciever import Reciever

ALICE = 'Alice'
BOB = 'Bob'
ORIGINAL_BITS_SIZE = 20

def is_lambda(x):
  return callable(x) and x.__name__ == '<lambda>'

class ClassesTests(unittest.TestCase):
  def setUp(self):
    self.sender = Sender(ALICE, ORIGINAL_BITS_SIZE)
    self.reciever = Reciever(BOB, ORIGINAL_BITS_SIZE)
    
  @unittest.expectedFailure
  def test_participant():
    participant = Participant('Participant', ORIGINAL_BITS_SIZE)

if __name__ == '__main__':
  unittest.main()
