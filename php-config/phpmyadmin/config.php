<?php
$server = [];

if (\JENV\session_try_login(true)) {
	$server['auth_type'] = 'config';
	$server['user']      = 'root';
	$server['password']  = \JENV\CONIG_DB_SUPER_PASSWORD;
}

$server['verbose']           = 'config-server';
$server['host']              = \JENV\CONIG_DB_SERVER;
$server['port']              = \JENV\CONIG_DB_PORT;
$server['socket']            = '';
$server['DisableIS']         = true;
$server['pmadb']             = 'phpmyadmin';
$server['controluser']       = 'phpmyadmin';
$server['controlpass']       = 'phpmyadmin';
$server['bookmarktable']     = 'pma__bookmark';
$server['relation']          = 'pma__relation';
$server['userconfig']        = 'pma__userconfig';
$server['users']             = 'pma__users';
$server['usergroups']        = 'pma__usergroups';
$server['navigationhiding']  = 'pma__navigationhiding';
$server['table_info']        = 'pma__table_info';
$server['column_info']       = 'pma__column_info';
$server['history']           = 'pma__history';
$server['recent']            = 'pma__recent';
$server['favorite']          = 'pma__favorite';
$server['table_uiprefs']     = 'pma__table_uiprefs';
$server['tracking']          = 'pma__tracking';
$server['table_coords']      = 'pma__table_coords';
$server['pdf_pages']         = 'pma__pdf_pages';
$server['savedsearches']     = 'pma__savedsearches';
$server['central_columns']   = 'pma__central_columns';
$server['designer_settings'] = 'pma__designer_settings';
$server['export_templates']  = 'pma__export_templates';

$cfg['Servers'][1] = $server;

$cfg['ZipDump']                           = false;
$cfg['BZipDump']                          = false;
$cfg['LoginCookieRecall']                 = false;
$cfg['PmaNoRelation_DisableWarning']      = true;
$cfg['LoginCookieValidityDisableWarning'] = true;
$cfg['UserprefsDeveloperTab']             = true;
$cfg['OBGzip']                            = 0;
$cfg['PersistentConnections']             = true;
$cfg['ProxyUrl']                          = \JENV\PROXY_SERVER_NAME;
$cfg['QueryHistoryDB']                    = true;
$cfg['RetainQueryBox']                    = true;
$cfg['NavigationTreeDefaultTabTable2']    = 'browse';
$cfg['DefaultLang']                       = 'zh_CN';
$cfg['ServerDefault']                     = 1;

$cfg['AllowArbitraryServer'] = true;
$cfg['blowfish_secret']      = 'fvskl,gnw5%htbjn,789y$iufk&98tg^%&8764tdmf*&&x154^yhgy$s';
$cfg['UploadDir']            = __DIR__;
$cfg['SaveDir']              = __DIR__;

$i = 2;
