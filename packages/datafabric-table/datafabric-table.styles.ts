import { css } from 'lit';
const style = css`
    :host {
        display: block;
    }
`;



export const tableCardStyles = css`
  .table-card {
    border: 1px solid #dbe7ff;
    border-radius: 12px;
    background: #fff;
    margin-bottom: 20px;
  }

  .table-title {
    background: #cbddf6;
    padding: 14px 18px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-radius: 12px 12px 0 0;
  }

  .title-text {
    color : black
  }

  .title-left {
    display: flex;
    align-items: center;
    gap: 10px;
    color: #13317e;
    font-weight: 600;
  }

  .table-controls {
  display: flex;
  justify-content: flex-end;
  padding: 14px 18px;
  gap: 16px; /* optional: space between the two items */
  }

  .show-by {
    display: flex;
    gap: 8px;
    align-items: center;
  }

  .dropdown {
    border: 1px solid #c7d7ff;
    padding: 6px 10px;
    border-radius: 6px;
  }

  .page-info {
    display: flex;
    gap: 10px;
    align-items: center;
    color: #1e50b5;
  }

  .table-wrapper {
    padding: 0 18px 16px;
  }

  table {
    width: 100%;
    border-collapse: separate;
    border-spacing: 0;
  }

  thead th {
    text-align: left;
    font-size: 14px;
    padding: 12px;
    border-bottom: 1px solid #e6edff;
    color: #213877;
  }

  tbody td {
    padding: 14px 12px;
    border-bottom: 1px solid #f0f4ff;
    font-size: 14px;
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  .actions {
    text-align: center;
  }

  .edit-icon {
    color: #1f6fff;
    cursor: pointer;
  }
`;


export const componentStyles = [style, tableCardStyles];
