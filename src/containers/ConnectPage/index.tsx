import React from 'react';

import {Button} from '@fluentui/react-northstar';

import {PLUGIN_API, ENV_VARIABLES} from '../../constants';

const ConnectPage = () => {
    return (
        <div className='msteams-connect'>
            <div className='msteams-connect__title'>{'Connect your account'}</div>
            <div className='msteams-connect__description'>{'Authorize your Microsoft Teams account and broadcast your messages from Microsoft Teams to Mattermost.'}</div>
            <a

                // TODO: update the url from configuration page
                href={`https://e3c2-2405-201-402b-6c0f-9136-66-e463-7ab5.in.ngrok.io/plugins/${ENV_VARIABLES.PLUGIN_ID}/api/v1/teams${PLUGIN_API.CONNECT_ACCOUNT_LINK}`}
                target='_blank'
                className='msteams-connect__button d-flex flex-row'
                rel='noreferrer'
            >
                {'Connect Now'}
            </a>
            <Button
                primary={true}
                content='Already connected? Go to home'
                className='margin-left-25'
            />
        </div>
    );
};

export default ConnectPage;
