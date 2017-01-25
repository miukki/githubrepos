
module Overcommit::Hook::PreCommit
  class GruntUnitTests < Base
  	def run
  		result = execute(%w[grunt test:unit])
  		if result.stdout =~ /Aborted due to warnings/
  			return :fail, result.stdout
  		end
  		:pass
  	end

  end
end