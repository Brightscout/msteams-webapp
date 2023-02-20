import React, {useEffect, useState} from 'react';
import {FetchBaseQueryError} from '@reduxjs/toolkit/dist/query';

import {Button, Dialog, Input, Loader} from '@fluentui/react-northstar';

import ResultPanel from '../../components/resultPanel';
import {GenericError} from '../../constants';
import SVGIcons from '../../constants/icons';
import {useConnectChannelMutation} from '../../services';

const InputPanel = () => {
    const [teamsChannelUrl, setTeamsChannelUrl] = useState('');
    const [mattermostChannelUrl, setMattermostChannelUrl] = useState('');
    const [showResultPanel, setShowResultPanel] = useState(false);

    // Error states
    const [teamsChannelUrlError, setTeamsChannelUrlError] = useState(false);
    const [mattermostChannelUrlError, setMattermostChannelUrlError] = useState(false);

    // Services
    const [connectChannel, {isError, isSuccess, isLoading, error}] = useConnectChannelMutation();

    const handleTeamsChannelUrlChange = (e: React.SyntheticEvent) => {
        setTeamsChannelUrlError(false);
        setTeamsChannelUrl((e.target as HTMLInputElement).value);
    };

    const handleMattermostChannelUrlChange = (e: React.SyntheticEvent) => {
        setMattermostChannelUrlError(false);
        setMattermostChannelUrl((e.target as HTMLInputElement).value);
    };

    const handleChannelConnect = () => {
        if (!teamsChannelUrl) {
            setTeamsChannelUrlError(true);
        }

        if (!mattermostChannelUrl) {
            setMattermostChannelUrlError(true);
        }

        if (teamsChannelUrl && mattermostChannelUrl) {
            connectChannel({
                mmChannelUrl: mattermostChannelUrl,
                teamsChannelUrl,
            });
        }
    };

    useEffect(() => {
        if (isSuccess || isError) {
            setShowResultPanel(true);
        }
    }, [isSuccess, isError]);

    return (
        <div className='msteams-home'>
            <div className='msteams-home__title'>{'Mattermost Connect'}</div>
            <div className='msteams-home__input-panel'>
                <Input
                    placeholder='URL'
                    label='Teams channel URL'
                    className='msteams-home__input-component'
                    required={true}
                    error={teamsChannelUrlError}
                    onChange={handleTeamsChannelUrlChange}
                    disabled={isLoading}
                />
                <Input
                    placeholder='URL'
                    label='Mattermost channel URL'
                    className='msteams-home__input-component'
                    required={true}
                    error={mattermostChannelUrlError}
                    onChange={handleMattermostChannelUrlChange}
                    disabled={isLoading}
                />
                <Button
                    primary={true}
                    content='Connect a channel'
                    className='msteams-home__input-button'
                    onClick={handleChannelConnect}
                    disabled={isLoading}
                />
                {isLoading && (
                    <Loader
                        label='Connecting...'
                        inline={true}
                    />
                )}
                {showResultPanel && (
                    <Dialog
                        content={
                            <ResultPanel
                                message={isSuccess ? 'Channel Connected Successfully' : ((error as FetchBaseQueryError).data as APIError | undefined)?.message ?? GenericError}
                                icon={isSuccess ? SVGIcons.success : SVGIcons.error}
                            />
                        }
                        cancelButton='Close'
                        onCancel={() => setShowResultPanel(false)}
                        confirmButton={isError && 'Try Again'}
                        onConfirm={() => setShowResultPanel(false)}
                        backdrop={true}
                        open={showResultPanel}
                    />
                )}
            </div>
        </div>
    );
};

export default InputPanel;
