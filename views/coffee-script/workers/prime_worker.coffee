n = 1
loop
  n += 1
  # if n > 100000
  #   return
  found = true
  for i in [2..Math.floor(Math.sqrt(n))]
    if n % `i == 0`
      found = false
      break
  postMessage(n) if found
