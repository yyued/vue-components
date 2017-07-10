import './index.style.scss';

export default {
    props: {
        total: {
            type: Number,
            required: true,
            default: 1,
            validator ( v ) {
                return v > 0;
            },
        },
        current: {
            type: Number,
            required: true,
            default: 1,
            validator ( v ) {
                return v > 0;
            },
        },
    },
    data () {
        return {
            threshold: 4,
            start: 1,
            end: 1,
        };
    },
    methods: {
        chooseEvent ( index ) {
            switch ( index ) {
                case 'previous':
                    if ( this.current - 1 > 0 ) {
                        this.$emit('choose', this.current - 1);
                    }
                    break;
                case 'next':
                    if ( this.current + 1 <= this.total ) {
                        this.$emit('choose', this.current + 1);
                    }
                    break;
                default:
                    this.$emit('choose', index);
                    break;
            }
        },
        pagesMarkup () {
            let middle = parseInt(this.threshold / 2);
            if ( this.current + this.threshold <= this.total ) {
                if ( this.current - this.threshold > 0 ) {
                    this.start = this.current - middle;
                } else {
                    this.start = 1;
                }
            } 
            else {
                if ( this.current + this.threshold >= this.total ) {
                    if ( this.total - this.threshold > 0 ) {
                        this.start = this.total - this.threshold;
                    } else {
                        this.start = 1;
                    }
                } else {
                    this.start = this.total - this.threshold;
                }
            }

            if ( this.start + this.threshold >= this.total ) {
                this.end = this.total;
            } 
            else if ( this.start + this.threshold < this.total ) {
                this.end = this.start + this.threshold;
            }

        },
        pagesContent ( h ) {
            let pages = [];
            for ( let i = 0; i <= this.end - this.start; i++ ) {
                let classObject = '';
                let onClickEvent = () => this.chooseEvent( num );
                let num = this.start + i;
                num === this.current ? classObject = 'active' : '';
                num === this.current ? onClickEvent = () => {} : '';
                pages.push( 
                    <li 
                        class={ classObject } 
                        onClick={ onClickEvent }
                    >
                        { num }
                    </li>
                );
            }
            return pages;
        },
        previousPages ( h ) {
            let pages = [];
            if ( this.start > 2 ) {
                for (let i = 1, max = 2; i <= max; i++ ) {
                    pages.push(<li onClick={ () => this.chooseEvent( i ) }>{ i }</li>);
                }
            }
            if ( this.start > 3 ) {
                pages.push(<li class="more">...</li>);
            }          
            return pages;
        },
        nextPages ( h ) {
            let pages = [];
            if ( this.end <= this.total - 2 ) {
                for (let i = this.total - 1, max = this.total; i <= max; i++ ) {
                    pages.push(<li onClick={ () => this.chooseEvent( i ) }>{ i }</li>);
                }
            }
            if ( this.end <= this.total - 3 ) {
                pages.unshift(<li class="more">...</li>);
            }
            return pages;
        }
    },

    render ( h ) {
        this.pagesMarkup();
        return (
            <div class="pagination">
                <button class="previous" onClick={ () => this.chooseEvent('previous') } >Previous</button>
                <ul>
                    { this.previousPages( h ) }
                    { this.pagesContent( h ) }
                    { this.nextPages( h ) }
                </ul>
                <button class="next" onClick={ () => this.chooseEvent('next') }>Next</button>
            </div>
        );
    }
};