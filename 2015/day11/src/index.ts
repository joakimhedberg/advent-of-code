import fs from 'fs'

const data = fs.readFileSync('./data/input.txt', 'utf-8')

/** Password rules
 * Exactly 8 lowercase letters
 * Must include one increasing straight of at least three letters, abc, bcd, cde etc up to xyz
 * May not contain letters i, o or l
 * Must contain at least two different, non-overlapping pairs of letters, aa, bb, zz etc
 */

/*const allowedCharacters = 'abcdefghjkmnpqrstuvwxyz'.split('')

const hasChar = (password: string, ...characters: string[]): boolean => {
  for (const char of password) {
    if (characters.indexOf[char] > -1) return true
  }

  return false
}

const hasStraight = (password: string): boolean => {
  for (let i = 0; i < password.length - 2; i++) {
    let code1 = password.charCodeAt(i)
    let code2 = password.charCodeAt(i + 1)
    let code3 = password.charCodeAt(i + 2)
    if ((code1 + code2 + code3 - 3) / 3 === code1) return true
  }

  return false
}

const hasTwoPairs = (password: string): boolean => {
  let pairs = 0
  for (let i = 0; i < password.length - 1; i++) {
    if (password[i] === password[i + 1]) {
      pairs++
      i += 2
    }
  }

  return pairs > 1
}

const isLegalPassword = (password: string): boolean => {
  if (password.length !== 8) return false
  for (const char of password) {
    if (allowedCharacters.indexOf(char) < 0) return false
  }
  if (!hasStraight(password)) return false
  if (!hasTwoPairs(password)) return false
}

function increasePassword(password: string): string {
  const pw = password.split('')
  let i = pw.length - 1
  while (true) {
    const next = allowedCharacters[allowedCharacters.indexOf(password[i]) + 1]
    if (next === undefined) {
      pw[i] = 'a'
      i--
    }
    else {
      pw[i] = next
      return pw.join('')
    }
  }
}*/

// Eight lowercase letters
// One increasing straight of at least three letters, abc, cde etc
// No letters i, o or l
// Two different, non-overlapping pairs aa, bb, cc etc

class Password {
  private static validCharacters = 'abcdefghjkmnpqrstuvwxyz'
  
  private _position
  private _password: number[]
  constructor(password: string) {
    this._password = Array.from(password).map(c => Password.validCharacters.indexOf(c))
    this._position = this._password.length - 1
  }

  public static isValidPassword = (pwd: string): boolean => {
    if (pwd.length !== 8) {
      return false
    }
    for (let c of pwd) {
      if (Password.validCharacters.indexOf(c) < 0) return false
    }
    
    let straights = 0
    for (let i = 0; i < pwd.length - 3; i++) {
      const chars = pwd.slice(i, i + 3)
      if (Password.validCharacters.indexOf(chars) > -1) {
        straights++
      }
      if (straights < 1) {
        return false
      }
    }
  
    if (straights === 0) {
      return false
    }
  
    let overlaps = 0
    for (let i = 0; i < pwd.length - 2; i++) {
      const chars = pwd.slice(i, i + 2)
      if (Password.validCharacters.indexOf(chars) > -1) {
        overlaps++
      }
    }
  
    return overlaps >= 2
  }

  public get password(): string {
    return this._password.map(idx => Password.validCharacters[idx]).join('')
  }

  public get nextPassword(): string {
    if (this._position <= 0) {
      this._position = this._password.length - 1
    }

    let pos = this._password.length - 1
    while (this.incrementAt(pos)) {
      pos--
    }

    return this.password
  }

  private incrementAt(pos: number): boolean {
    this._password[pos] += 1
    if (this._password[pos] > Password.validCharacters.length - 1) {
      this._password[pos] = 0
      return true
    }
    return false
  }
  
}


let password = data
const pw = new Password(data)

let isValid = false


while (!isValid) {
  password = pw.nextPassword
  isValid = Password.isValidPassword(password)
}

console.log(password)