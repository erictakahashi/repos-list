import styled from 'styled-components';
import MaterialTable from '@material-ui/core/Table';
import MaterialTableBody from '@material-ui/core/TableBody';
import MaterialTableCell from '@material-ui/core/TableCell';
import MaterialTableContainer from '@material-ui/core/TableContainer';
import MaterialTableHead from '@material-ui/core/TableHead';
import MaterialTableRow from '@material-ui/core/TableRow';

import NavbarComp from '../../components/Navbar/Navbar';
import mixins from '../../styles/mixins';

const Wrapper = styled.div``;

const Navbar = styled(NavbarComp)``;

const Container = styled.div`
  ${mixins.container}
  padding-top: 30px;
  padding-bottom: 30px;
`;

const NoTable = styled.div``;

const TableLink = styled.a.attrs({
  target: '_blank'
})``;

const Table = styled(MaterialTable)``;

const TableBody = styled(MaterialTableBody)``;

const TableCell = styled(MaterialTableCell)``;

const TableContainer = styled(MaterialTableContainer)``;

const TableHead = styled(MaterialTableHead)`
  ${TableCell} {
    line-height: 1.5em;
    font-size: 1em;
    font-weight: bold;
  }
`;

const TableRow = styled(MaterialTableRow)``;

const Styled = {
  Container,
  Navbar,
  NoTable,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableLink,
  TableRow,
  Wrapper
};

export default Styled;
