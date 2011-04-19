class String
  def camelcase
    self.gsub(/(^[a-z])|(_[a-z])/) { |a| a.upcase }.gsub(/_/, '')
  end
end