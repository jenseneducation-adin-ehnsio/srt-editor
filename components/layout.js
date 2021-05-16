import PropTypes from 'prop-types';
import styles from './layout.module.scss';

const Layout = (props) => <div className={styles.app}>{props.children}</div>;

Layout.propTypes = {
  children: PropTypes.node
};

Layout.defaultProps = {
  children: null
};

export default Layout;
