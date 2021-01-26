import * as ReactRedux from 'react-redux';
import { shallow } from 'enzyme';

import * as ActionsRepos from '../../../store/actions/repos';
import Home, { RenderTable } from '../Home';
import Styled from '../Home.styled';

/**
 * Factory function that will create a `Home` shallow wrapper.
 */
const setup = () => shallow(<Home />);

describe('Home', () => {
  let dispatch: any, dispatchFn: any;

  let getRepos: any, getReposFn: any;

  let useSelector: any;

  const repos = [
    {
      forks_count: 1,
      html_url: 'url',
      name: 'name',
      stargazers_count: 2,
      ssh_url: 'ssh'
    }
  ];

  beforeEach(() => {
    dispatchFn = jest.fn();
    dispatch = jest.spyOn(ReactRedux, 'useDispatch');
    dispatch.mockReturnValue(dispatchFn);

    getReposFn = jest.fn();
    getRepos = jest.spyOn(ActionsRepos, 'getRepos');
    getRepos.mockReturnValue(getReposFn);

    useSelector = jest.spyOn(ReactRedux, 'useSelector');
    useSelector.mockReturnValue({
      repos
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  afterAll(() => {
    jest.clearAllMocks();
  });

  it('should render a `wrapper` container', () => {
    const component = setup();
    const wrapper = component.find(Styled.Wrapper);
    expect(wrapper.length).toBe(1);
  });

  it('should render a `navbar` component', () => {
    const component = setup();
    const navbar = component.find(Styled.Navbar);
    expect(navbar.length).toBe(1);
  });

  it('should render a `container`', () => {
    const component = setup();
    const container = component.find(Styled.Container);
    expect(container.length).toBe(1);
  });

  it('should render a `RenderTable` component', () => {
    const component = setup();
    const renderTable = component.find(RenderTable);
    expect(renderTable.length).toBe(1);
  });

  describe('RenderTable', () => {
    describe('no data', () => {
      it('should render `no chart` when `data` is not provided', () => {
        const component = shallow(<RenderTable />);
        const noTable = component.find(Styled.NoTable);
        expect(noTable.length).toBe(1);
      });
    });

    describe('with data', () => {
      it('should render `table container` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableContainer = component.find(Styled.TableContainer);
        expect(tableContainer.length).toBe(1);
      });

      it('should render `table` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const table = component.find(Styled.Table);
        expect(table.length).toBe(1);
      });

      it('should render `table head` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableHead = component.find(Styled.TableHead);
        expect(tableHead.length).toBe(1);
      });

      it('should render a table head `table row` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableHead = component.find(Styled.TableHead);
        const tableRow = tableHead.find(Styled.TableRow);
        expect(tableRow.length).toBe(1);
      });

      it('should render 3 table head `table cell` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableHead = component.find(Styled.TableHead);
        const tableCell = tableHead.find(Styled.TableCell);
        expect(tableCell.length).toBe(3);
      });

      it('should render `table body` component', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableBody = component.find(Styled.TableBody);
        expect(tableBody.length).toBe(1);
      });

      it('should render a table body `table row` component according to array of repos', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableBody = component.find(Styled.TableBody);
        const tableRow = tableBody.find(Styled.TableRow);
        expect(tableRow.length).toBe(repos.length);
      });

      it('should render a table body `table cell` component according to array of repos', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableBody = component.find(Styled.TableBody);
        const tableCell = tableBody.find(Styled.TableCell);

        const expectedCells = repos.length * 3;
        expect(tableCell.length).toBe(expectedCells);
      });

      it('should render a table body `table link` component according to array of repos', () => {
        const component = shallow(<RenderTable data={repos} />);
        const tableBody = component.find(Styled.TableBody);
        const tableLink = tableBody.find(Styled.TableLink);
        expect(tableLink.length).toBe(repos.length);
      });
    });
  });
});
