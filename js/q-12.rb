
def with_integer
  i = 1
  while i += 1
    str = ('%10.10f' % Math.sqrt(i)).sub('.', '')[0..9]
    break if str.split('').uniq.length == 10
  end
  i
end

def with_fractional
  i = 1
  while i += 1
    str = ('%10.10f' % Math.sqrt(i)).split('.')[1]
    break if str.split('').uniq.length == 10
  end
  i
end
p with_integer
p with_fractional
