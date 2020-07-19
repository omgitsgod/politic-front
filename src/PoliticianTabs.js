import React from 'react';
import { Tab, Tabs } from '@material-ui/core';
import { KeyboardBackspace, Info, LineWeight } from '@material-ui/icons';


function PoliticianTabs(props) {

    const { tab, handleChange } = props;

    return (
        <Tabs
            value={tab}
            onChange={handleChange}
            variant='fullWidth'
            indicatorColor='secondary'
            textColor='secondary'
        >
            <Tab icon={<KeyboardBackspace />} value={'Back'} label='Back' />
            <Tab icon={<Info />} value={'Data'} label='Info' />
            <Tab icon={<LineWeight />} value={'News'} label='News' />
        </Tabs>
    );
}

export default PoliticianTabs;
