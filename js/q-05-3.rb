@cnt = 0
@combinations = []

def change(target, coins, usable, nest=1, combinations={})
  coin = coins.shift

  if coins.size == 0 then
    num_used = (target / coin)
    p "coin=#{coin}, target = #{target}, num_used = #{num_used}"
    if num_used <= usable
      @cnt += 1
      combinations[coin] = num_used
      # p coin, combinations
      @combinations.push combinations
    end
  else
    indent = "  " * nest
    (0..target/coin).each do |i|
      combinations[coin] = i
      change(target - coin * i, coins.clone, usable - i, nest + 1, combinations)
    end
  end
end
change(1000, [500, 100, 50, 10], 20)
# puts @cnt
require "pp"
p @cnt
# pp @combinations
# pp @combinations.size
