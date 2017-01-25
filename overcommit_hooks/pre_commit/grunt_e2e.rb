
module Overcommit::Hook::PreCommit
  class GruntE2e < Base
  	def run
  		result = execute(%w[grunt test:e2e])
  		if result.stdout =~ /Aborted due to warnings/
  			return :fail, result.stdout
  		end
  		:pass
  	end

  end
end