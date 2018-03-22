module Main where

import Foundation
import Data.Maybe

data Tree k v = Two {key :: k, value :: v, left :: Tree k v, right :: Tree k v} | 
                Three {leftKey :: k, rightKey :: k, leftValue :: v, rightValue :: v, left :: Tree k v, middle :: Tree k v, right :: Tree k v} | 
                Leaf k v

search :: Tree k v -> k -> Maybe v
-- O(1) for a leaf
search (Leaf key value) searchKey
  | key == searchKey = Just value
  | otherwise        = Nothing
-- Recurrence relation: T(n) = T(n/2) + O(1)
search (Two key value left right) searchKey
  | key == searchKey = Just value
  | key < searchKey  = search left searchKey
  | key > searchKey  = search right searchKey
search (Three leftKey rightKey leftValue rightValue left middle right) searchKey
  | key < leftKey                   = search left searchKey
  | key == leftKey                  = Just leftValue
  | key > leftKey && key < rightKey = search middle searchKey
  | key == rightKey                 = Just rightValue
  | key > rightKey                  = search right searchKey

main :: IO ()
main = do
  putStrLn $ "hello " <> "world"
