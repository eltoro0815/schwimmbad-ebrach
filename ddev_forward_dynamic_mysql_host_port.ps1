﻿# 
# FIRST, you have to get jq from
#
# https://stedolan.github.io/jq/download/
#
#
# If you have trouble visit
#
# https://woshub.com/port-forwarding-in-windows/
#
# and analyze the prerequisites 
#
# --------------------------------------------------------------------------------------------------------------------------------------------------------

$mysql_host_port_generated_by_ddev = ddev describe -j | jq -r .raw.dbinfo.published_port
$mysql_host_port_wanted = "3306"

if ($mysql_host_port_generated_by_ddev -eq "null") {
    Write-Host -ForegroundColor Red ("Mysql Host port generated by ddev not found.")
    ddev describe
}
else {
    Write-Host -ForegroundColor Blue  ("MySql Host Port generated by ddev is $mysql_host_port_generated_by_ddev.")
    Write-Host ("Trying to forward it to the port $mysql_host_port_wanted.")

    netsh interface portproxy reset
    netsh interface portproxy add v4tov4 listenport=$mysql_host_port_wanted listenaddress=127.0.0.1 connectport=$mysql_host_port_generated_by_ddev connectaddress=127.0.0.1
    
    $test_first = netstat -ano | findstr :$mysql_host_port_wanted
    
    if ([string]::IsNullOrEmpty($test_first)) {
        Write-Host -BackgroundColor Red ("There was an error(ERR_CODE_1). Visit https://woshub.com/port-forwarding-in-windows/ and analyze the prerequisites.")
    }
    else {

        $test_two = netsh interface portproxy show v4tov4 | findstr $mysql_host_port_generated_by_ddev | findstr $mysql_host_port_wanted

        if ([string]::IsNullOrEmpty($test_two)) {
            Write-Host -BackgroundColor Red ("There was an error(ERR_CODE_2). Visit https://woshub.com/port-forwarding-in-windows/ and analyze the prerequisites.")
        }
        else {
            Write-Host -ForegroundColor Green  ("MySql Host Port $mysql_host_port_generated_by_ddev succesfully forwarded to $mysql_host_port_wanted.")
        }
        
    }
}

