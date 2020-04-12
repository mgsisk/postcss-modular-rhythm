Vagrant.configure('2') do |config|
  ENV['lc'] ||= 'en_US.UTF-8'
  ENV['USER'] ||= 'user'
  ENV['tz'] ||= 'America/Detroit'

  hostname = File.basename(Dir.pwd) + '.test'

  config.vm.define 'test', primary: true do |test|
    test.vm.provider 'virtualbox' do |vb|
      vb.name = "#{ENV['USER']}-#{hostname.gsub '.', '-'}"
    end

    test.vm.box = 'debian/contrib-buster64'
    test.vm.hostname = hostname
    test.vm.provision :shell, path: 'vagrant.sh', args: [ENV['lc'], ENV['tz']]
  end
end
