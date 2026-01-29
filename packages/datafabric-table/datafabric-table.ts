import { ATTRIBUTE_TYPE, AlphaAttribute, AlphaComponent, UI_TYPE, adoptAlphaCommonStyle } from '@jatahworx/alpha-annotations-lib';
import { LitElement, html } from 'lit';
import { property, state } from 'lit/decorators.js';
import { componentStyles } from './datafabric-table.styles.ts';
import { ClassInfo, classMap } from 'lit/directives/class-map.js';

interface DatafabricTableOptions {
    enableRefresh: any;
    columns: Array<{ value: string; display: string }>;
    actions: Array<{ actionName: string | undefined; icon: string; color: string | undefined }>;
    pagination: boolean;
    paginationData: {
        mode: 'server' | 'client';
        paramType: string;
        count: string;
        pageNumberKey: string;
        pageSizeKey: string;
        rowOptions: Array<number>;
        totalRecords: number | null;
    };
    classes: ClassInfo;
    rowOptions: Array<number>;
    actionColumn: boolean;
}

@AlphaComponent({
    componentName: 'datafabric-table',
    componentVersion: '1.0.0',
    label: 'Datafabric table',
    selector: 'comp-datafabric-table',
    category: 'Input',
    icon: 'sample.png',
})
@adoptAlphaCommonStyle()



export class DatafabricTable extends LitElement {
    static styles = componentStyles;


    /**
     * @description 
     *  Attribute for property for the component
     * @param type -- ATTRIBUTE_TYPE.PROPERTY
     * @param uiType -- type of the component by which the value can get to this property
     * @param label -- Label on the editable component
     * @param defaultValue -- Default value to the property
     * @param placeholder -- placeholder on the editable component
     * @param fieldMappings -- the value of this attribute will assign to the path/property name defined here
     */
    // @AlphaAttribute({
    //     type: ATTRIBUTE_TYPE.PROPERTY,
    //     uiType: UI_TYPE.INPUT,
    //     label: 'Initial Count',
    //     defaultValue: 0,
    //     placeholder: 'Enter label',
    //     fieldMappings: 'value'
    // })


    // @AlphaAttribute({
    //     uiType: UI_TYPE.TYPED_INPUT,
    //     type: ATTRIBUTE_TYPE.PROPERTY,
    //     label: 'Value',
    //     category: 'Binding Variable',
    //     options: [
    //         { name: 'CO', value: 'co' },
    //         { name: 'CMS', value: 'cms' },
    //         { name: 'Case Instance', value: 'case_instance' },
    //         { name: 'Task Instance', value: 'task_instance' },
    //         { name: 'Local', value: 'local' },
    //         { name: "Data Fabric", value: 'datafabric' }
    //     ],
    //     fieldMappings: {
    //         type: 'options.mappingType',
    //         value: 'options.modelPath',
    //     },
    // })

    @AlphaAttribute({
        uiType: UI_TYPE.DATA_MAPPING,
        defaultValue: '',
        type: ATTRIBUTE_TYPE.PROPERTY,
        label: 'type',
        placeholder: 'Select',
        category: 'Data Source',
        onRemoveAction: {
            prompt: 'Are you sure you want to delete this action?',
            note: '* If you delete this action, the configured triggers are also deletes!',
        },
        fieldMappings: {
            response: 'value',
            actions: 'options.actions',
            columns: 'options.columns',
            actionColumn: 'options.actionColumn',
            pagination: 'options.pagination',
            paginationData: 'options.paginationData',
        },
        options: [
            { displayText: 'CO', value: 'co' },
            { displayText: 'API', value: 'api' },
            { displayText: 'Reels', value: 'reels' },
            { displayText: 'DMS', value: 'dms' },
            { displayText: 'Local', value: 'local' },
            { displayText: 'Data Fabric', value: 'datafabric' }
        ],
    })
    @AlphaAttribute({
        uiType: UI_TYPE.TOGGLE,
        defaultValue: false,
        type: ATTRIBUTE_TYPE.PROPERTY,
        label: 'Enable Refresh Icon',
        fieldMappings: 'options.enableRefresh',
        category: 'Additional Properties',
    })

    @property({ type: Boolean })
    disabled = false;

    @property({ type: Object })
    options = {
        title: 'License Information',
        icon: 'badge',
        columns: [
            { display: 'License No.', value: 'licenseNo' },
            { display: 'E&O Policy No.', value: 'policyNo' },
            { display: 'E&O Expiry Date', value: 'eoExpiry' },
            { display: 'License Expiry Date', value: 'licenseExpiry' }
        ],
        actions: [
            { actionName: 'edit', icon: 'edit' }
        ],
        pagination: true
    };

    value = [
        {
            licenseNo: 'LI-1001',
            policyNo: 'EO-4048-2025',
            eoExpiry: '2025-06-01',
            licenseExpiry: '2025-08-31'
        }
    ];


    @property({ type: Boolean })
    readonly = false;

    @state()
    private sortKey: keyof Row | null = null

    @property({ type: Boolean })
    isVisible = false

    @state()
    private sortOrder: 'asc' | 'dsc' = 'asc'

    @state()
    private searchTerm: string = ''

    private rows: Row[] = [
        { id: 1, name: 'Aswin', age: 22, role: 'SDE-I' },
        { id: 2, name: 'Shrinidhi', age: 30, role: 'TL' },
        { id: 3, name: 'Naveen', age: 26, role: 'SDE-II' },
    ]

    @property({ type: Array })
    filteredRow: Row[] = this.rows

    handleInputChange(event: Event) {
        const input = event.target as HTMLInputElement
        this.searchTerm = input.value
    }

    handleSort(key: keyof Row) {
        if (this.sortKey === key) {
            this.sortOrder = this.sortOrder === 'asc' ? 'dsc' : 'asc'
        } else {
            this.sortKey = key
            this.sortOrder = 'dsc'
        }

        this.filteredRow.sort((a, b) => {
            const valueA = a[this.sortKey]
            const valueB = b[this.sortKey]
            if (valueA < valueB) return this.sortOrder === 'asc' ? -1 : 1
            if (valueA > valueB) return this.sortOrder === 'asc' ? 1 : -1
            return 0
        })
    }

    handleSearch() {
        // handle the search logic here
        this.isVisible = !this.isVisible
        this.filteredRow = this.filteredRow.filter((item: Row) => item.name.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()))
    }



    clearSearch() {
        this.filteredRow = this.rows
        this.searchTerm = ''
    }

    private _renderTitle() {
        return html`
    <div class="table-title">
      <div class="title-left">
        <span class="material-symbols-outlined">${this.options.icon}</span>
        <span class="title-text">${this.options.title}</span>
      </div>
      <span class="material-symbols-outlined collapse-icon">expand_less</span>
    </div>
  `;
    }


    private _renderControls() {
        return html`
    <div class="table-controls">
      <div class="show-by">
        <span>Show by</span>
        <div class="dropdown">5 Rows</div>
      </div>
      <div class="page-info">
        <span class="material-symbols-outlined">chevron_left</span>
        <span>1 - 15 of 40</span>
        <span class="material-symbols-outlined">chevron_right</span>
      </div>
    </div>
  `;
    }

    private _renderHeader() {
        return html`
    <tr>
      ${this.options.columns.map(
            col => html`<th>${col.display}</th>`
        )}
      ${this.options.actions?.length ? html`<th>Actions</th>` : null}
    </tr>
  `;
    }

    private _renderRows(rows: Array<any>) {
        return rows.map(row => html`
    <tr>
      ${this.options.columns.map(
            col => html`<td>${row[col.value] ?? '-'}</td>`
        )}
      ${this.options.actions?.length
                ? html`
            <td class="actions">
              <span class="material-symbols-outlined edit-icon">edit</span>
            </td>
          `
                : null}
    </tr>
  `);
    }


    // render() {
    //     return html`
    //         <input placeholder="search..." .value=${this.searchTerm} @input =${this.handleInputChange}></input>
    //          <button @click=${this.handleSearch}>Search</button>
    //          <button @click=${this.clearSearch}>Clear</button>


    //         <table> 
    //             <thead>
    //                 <tr>
    //                     <th @click=${() => this.handleSort('id')}> ID </th>
    //                      <th @click=${() => this.handleSort('name')}> NAME </th>   
    //                      <th @click=${() => this.handleSort('age')}> AGE </th>
    //                      <th @click=${() => this.handleSort('role')}> ROLE </th>
    //                 </tr>
    //             </thead>

    //             <tbody> 
    //                 ${this.filteredRow.map((item: Row) =>
    //         html`
    //                         <tr>
    //                             <td>${item.id}</td>
    //                             <td>${item.name}</td>
    //                             <td>${item.age}</td>
    //                             <td>${item.role}</td>
    //                         </tr>
    //                     `
    //     )}
    //             </tbody>
    //         </table>

    //     `;
    // }
    render() {
        return html`
    <section class="table-card">
      ${this._renderTitle()}
      ${this._renderControls()}
      <div class="table-wrapper">
        <table>
          <thead>
            ${this._renderHeader()}
          </thead>
          <tbody>
            ${this._renderRows(this.value)}
          </tbody>
        </table>
      </div>
    </section>
  `;
    }

}
