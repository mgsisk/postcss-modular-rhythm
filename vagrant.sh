#!/bin/sh

init=$(date +%s)

export APT_KEY_DONT_WARN_ON_DANGEROUS_USAGE=true
export DEBIAN_FRONTEND=noninteractive

hostname=$(grep -m 1 '\.test' /etc/hosts | sed 's/		*/ /g' | cut -d ' ' -f 2)
locale=${1:-'en_US.UTF-8'}
timezone=${2:-'UTC'}
vnode='13'

# NOTE Use the Node version specified in package.json, if any.
if [ -e /vagrant/package.json ] && grep -q '"node":'; then
  vnode=$(grep -m 1 '"node": ' /vagrant/package.json | sed 's/[^0-9.]//g' | cut -d '.' -f 1)
fi



# ----- System -----------------------------------------------------------------

if grep -q 'root:!' /etc/shadow; then
  printf 'Updating root password'
  printf 'root:root' | chpasswd
fi

if ! timedatectl | grep -q "Time zone: $timezone"; then
  printf 'Updating system time zone'
  timedatectl set-timezone "$timezone"
fi

if ! locale | grep -iq "LANG=$locale" ; then
  printf 'Updating system locale'
  update-locale LANG="$locale"
fi

if [ ! -e /etc/apt/sources.list.d/vagrant.list ]; then
  printf 'Updating apt sources'
  wget -qO - https://nginx.org/keys/nginx_signing.key | apt-key add - >/dev/null
  printf 'deb http://nginx.org/packages/mainline/debian/ %s nginx\n' "$(lsb_release -cs)" >> /etc/apt/sources.list.d/vagrant.list
  wget -qO - https://deb.nodesource.com/gpgkey/nodesource.gpg.key | apt-key add - >/dev/null
  printf 'deb https://deb.nodesource.com/node_%s.x %s main\n' "$vnode" "$(lsb_release -cs)" >> /etc/apt/sources.list.d/vagrant.list
  wget -qO - https://packages.sury.org/php/apt.gpg | apt-key add - >/dev/null
  printf 'deb https://packages.sury.org/php %s main\n' "$(lsb_release -cs)" >> /etc/apt/sources.list.d/vagrant.list
  wget -qO - wget http://www.webmin.com/jcameron-key.asc | apt-key add - >/dev/null
  printf 'deb https://download.webmin.com/download/repository sarge contrib' >> /etc/apt/sources.list.d/vagrant.list
  apt-get -qq update
fi

if ! dpkg -l | grep -q 'nginx'; then
  printf 'Installing system packages'
  apt-get -qqy install \
    git                \
    nodejs             \
    vim                \
    >/dev/null 2>&1
fi



# ----- Utilities --------------------------------------------------------------

touch /home/vagrant/.bash_aliases

if [ -e /vagrant/package.json ]; then
  if [ ! -d /vagrant/node_modules ]; then
    printf 'Installing Node packages'
    npm set progress=false
    cd /vagrant || exit 1
    npm -s install >/dev/null 2>&1
    cd /home/vagrant || exit 1
    npm set progress=true
  fi

  if ! grep -q '/node_modules/' /home/vagrant/.bash_aliases; then
    printf 'Updating bash path for Node\n'
    # shellcheck disable=SC2016
    printf 'export PATH=/vagrant/node_modules/.bin:$PATH\n' >> /home/vagrant/.bash_aliases
    printf 'alias run="npm run -s"\n' >> /home/vagrant/.bash_aliases
  fi
fi



# ----- Finish -----------------------------------------------------------------

stop=$(date +%s)
mins=$(((stop - init) / 60))
secs=$((stop - init - mins * 60))

printf '\nProvisioning completed in %02dm %02ds\n' "$mins" "$secs"
printf 'Now serving %s at %s\n' "$(hostname -I | cut -d ' ' -f 2)" "$hostname"
printf 'See sys.%s for server administration' "$hostname"
