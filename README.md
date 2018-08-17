# Minimal path

## Installation

First make sure you have node js installed.

```bash
git clone https://gitlab.com/sebassdc/functionalTest.git
```
Then install the required dependencies:
```bash
cd functionalTest
npm install or yarn install
```
Then run npm link to have the cli on your path:
```bash
npm link or yarn link
```


## Usage
`minpath` Reads from the standard input.
```bash
cat << EOF | minpath
> 7
> 6 3
> 3 8 5
> 11 2 10 9
> EOF
Minimal path is: 7 + 6 + 3 + 2 = 18
```
or
```bash
cat data.txt | minpath
```
Minimal path is: 7 + 6 + 3 + 2 = 18