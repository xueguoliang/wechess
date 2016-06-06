import {createApp} from 'mantra-core';
import initContext from './configs/context';

import injectTapEventPlugin from 'react-tap-event-plugin';

// modules
import coreModule from './modules/core';
import usersModule from './modules/users';
import goModule from './modules/go';
import chessModule from './modules/chess';

injectTapEventPlugin();

// init context
const context = initContext();

// create app
const app = createApp(context);
app.loadModule(coreModule);
app.loadModule(usersModule);
app.loadModule(goModule);
app.loadModule(chessModule);
app.init();

