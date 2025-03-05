/**
 * Parse attributes from Builder into query string
 */

export default class Parser {
  builder: any;
  params: any;

  constructor(builder: any) {
    this.builder = builder;
    this.params = {};
  }

  // final query string
  query() {
    this.reset();
    this.includes();
    this.appends();
    this.fields();
    this.filters();
    this.sorts();
    this.page();
    this.limit();
    this.payload();

    return this.params;
  }

  reset() {
    this.params = {};
  }

  /**
   * Helpers
   */

  hasIncludes() {
    return this.builder.includes.length > 0;
  }

  hasAppends() {
    return this.builder.appends.length > 0;
  }

  hasFields() {
    return Object.keys(this.builder.fields).length > 0;
  }

  hasFilters() {
    return Object.keys(this.builder.filters).length > 0;
  }

  hasSorts() {
    return this.builder.sorts.length > 0;
  }

  hasPage() {
    return this.builder.page !== null;
  }

  hasLimit() {
    return this.builder.limit !== null;
  }

  hasPayload() {
    return this.builder.payload !== null;
  }

  parameterNames() {
    return {
      include: 'include',
      append: 'append',
      fields: 'fields',
      filter: 'filter',
      sort: 'sort',
      page: 'page',
      limit: 'limit',
    };
  }

  /**
   * Parsers
   */

  includes() {
    if (!this.hasIncludes()) {
      return;
    }

    this.params[this.parameterNames().include] = this.builder.includes;
  }

  appends() {
    if (!this.hasAppends()) {
      return;
    }

    this.params[this.parameterNames().append] = this.builder.appends;
  }

  fields() {
    if (!this.hasFields()) {
      return;
    }

    this.params[this.parameterNames().fields] = this.builder.fields;
  }

  filters() {
    if (!this.hasFilters()) {
      return;
    }

    this.params[this.parameterNames().filter] = this.builder.filters;
  }

  sorts() {
    if (!this.hasSorts()) {
      return;
    }

    this.params[this.parameterNames().sort] = this.builder.sorts;
  }

  page() {
    if (!this.hasPage()) {
      return;
    }

    this.params[this.parameterNames().page] = this.builder.page;
  }

  limit() {
    if (!this.hasLimit()) {
      return;
    }

    this.params[this.parameterNames().limit] = this.builder.limit;
  }

  payload() {
    if (!this.hasPayload()) {
      return;
    }

    this.params = {
      ...this.params,
      ...this.builder.payload,
    };
  }
}
