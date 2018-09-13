// function ThemedButton(props) {
//     return <Button theme={props.theme} />;
// }

// // 中间组件
// function Toolbar(props) {
//     // Toolbar 组件必须添加一个额外的 theme 属性
//     // 然后传递它给 ThemedButton 组件
//     return (
//         <div>
//             <ThemedButton theme={props.theme} />
//         </div>
//     );
// }

// class App extends React.Component {
//     render() {
//         return <Toolbar theme="dark" />;
//     }
// }



// // 创建一个 theme Context,  默认 theme 的值为 light
// const ThemeContext = React.createContext('light');

// function ThemedButton(props) {
//     // ThemedButton 组件从 context 接收 theme
//     return (
//         <ThemeContext.Consumer>
//             {theme => <Button {...props} theme={theme} />}
//         </ThemeContext.Consumer>
//     );
// }

// // 中间组件
// function Toolbar(props) {
//     return (
//         <div>
//             <ThemedButton />
//         </div>
//     );
// }

// class App extends React.Component {
//     render() {
//         return (
//             <ThemeContext.Provider value="dark">
//                 <Toolbar />
//             </ThemeContext.Provider>
//         );
//     }
// }


//theme-context.js

// export const themes = {
//     light: {
//         foreground: '#ffffff',
//         background: '#222222',
//     },
//     dark: {
//         foreground: '#000000',
//         background: '#eeeeee',
//     },
// };

// export const ThemeContext = React.createContext(
//     themes.dark // 默认值
// );

// //themed-button.js

// import { ThemeContext } from '../theme-context';

// function ThemedButton(props) {
//     return (
//         <ThemeContext.Consumer>
//             {theme => (
//                 <button
//                     {...props}
//                     style={{ backgroundColor: theme.background }}
//                 />

//             )}
//         </ThemeContext.Consumer>
//     );
// }

// export default ThemedButton;


// //app.js


// import { ThemeContext, themes } from '../theme-context';
// import ThemedButton from './themed-button';

// // 一个使用到ThemedButton组件的中间组件
// function Toolbar(props) {
//     return (
//         <ThemedButton onClick={props.changeTheme}>
//             Change Theme
//         </ThemedButton>
//     );
// }

// class App extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             theme: themes.light,
//         };

//         this.toggleTheme = () => {
//             this.setState(state => ({
//                 theme:
//                     state.theme === themes.dark
//                         ? themes.light
//                         : themes.dark,
//             }));
//         };
//     }

//     render() {
//         // ThemedButton 位于 ThemeProvider 内
//         // 在外部使用时使用来自 state 里面的 theme
//         // 默认 dark theme
//         return (
//             <Page>
//                 <ThemeContext.Provider value={this.state.theme}>
//                     <Toolbar changeTheme={this.toggleTheme} />
//                 </ThemeContext.Provider>
//                 <Section>
//                     <ThemedButton />
//                 </Section>
//             </Page>
//         );
//     }
// }

// ReactDOM.render(<App />, document.root);



// // 主题上下文, 默认light
// const ThemeContext = React.createContext('light');

// // 登陆用户上下文
// const UserContext = React.createContext();

// // 一个依赖于两个上下文的中间组件
// function Toolbar(props) {


//     return (
//         <ThemeContext.Consumer>
//             {theme => (


//                 <UserContext.Consumer>
//                     {user => (
//                         <ProfilePage user={user} theme={theme} />
//                     )}
//                 </UserContext.Consumer>
//             )}
//         </ThemeContext.Consumer>
//     );
// }

// class App extends React.Component {
//     render() {
//         const { signedInUser, theme } = this.props;

//         // App组件提供上下文的初始值
//         return (
//             <ThemeContext.Provider value={theme}>
//                 <UserContext.Provider value={signedInUser}>
//                     <Toolbar />
//                 </UserContext.Provider>
//             </ThemeContext.Provider>
//         );
//     }
// }


// class Button extends React.Component {
//     componentDidMount() {
//         // ThemeContext value is this.props.theme
//     }

//     componentDidUpdate(prevProps, prevState) {
//         // Previous ThemeContext value is prevProps.theme
//         // New ThemeContext value is this.props.theme
//     }

//     render() {
//         const { theme, children } = this.props;
//         return (
//             <button className={theme ? 'dark' : 'light'}>
//                 {children}
//             </button>
//         );
//     }
// }

// export default props => (
//     <ThemeContext.Consumer>
//         {theme => <Button {...props} theme={theme} />}
//     </ThemeContext.Consumer>
// );


// const ThemeContext = React.createContext('light');

// function ThemedButton(props) {
//     return (
//         <ThemeContext.Consumer>
//             {theme => <button className={theme} {...props} />}
//         </ThemeContext.Consumer>
//     );
// }


// const ThemeContext = React.createContext('light');

// // 在函数中引入组件
// export function withTheme(Component) {
//     // 然后返回另一个组件
//     return function ThemedComponent(props) {
//         // 最后使用context theme渲染这个被封装组件
//         // 注意我们照常引用了被添加的属性
//         return (
//             <ThemeContext.Consumer>
//                 {theme => <Component {...props} theme={theme} />}
//             </ThemeContext.Consumer>
//         );
//     };
// }

// function Button({ theme, ...rest }) {
//     return <button className={theme} {...rest} />;
// }

// const ThemedButton = withTheme(Button);




class FancyButton extends React.Component {
    focus() {
        // ...
    }

    // ...
}

// 使用 context 传递当前的 "theme" 给 FancyButton.
// 使用 forwardRef 传递 refs 给 FancyButton 也是可以的.
export default React.forwardRef((props, ref) => (
    <ThemeContext.Consumer>
        {theme => (
            <FancyButton {...props} theme={theme} ref={ref} />
        )}
    </ThemeContext.Consumer>
));


import FancyButton from './fancy-button';

const ref = React.createRef();

// ref属性将指向 FancyButton 组件,
// ThemeContext.Consumer 没有包裹它
// 这意味着我们可以调用 FancyButton 的方法就像这样 ref.current.focus()
<FancyButton ref={ref} onClick={handleClick}>
    Click me!
</FancyButton>;