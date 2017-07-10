<style lang="scss" scoped>
$mainColor: #1269D3;
$borderColor: #eee;

.pagination {
    width: 100%;
    height: 30px;
    line-height: 30px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    * {
        -webkit-touch-callout: none;
        user-select: none;
    }
    ul {
        li {
            height: 30px;
            border: 1px solid $borderColor;
            border-right: none;
            padding: 0 10px;
            color: $mainColor;
            cursor: pointer;
            display: inline-block;
            &:last-of-type{
                 border-right: 1px solid $borderColor;
            }
        }
        .active {
            border-color: $mainColor;
            background-color: $mainColor;
            color: #fff;
        }
        .more {
            color: rgba(0, 0, 0, .2);
            background-color: rgba(0, 0, 0, .02);   
        }
    }
}    

button {
    padding: 0 5px;
    min-width: 80px;
    height: 30px;
    background-color: #fff;
    color: $mainColor;
    font-size: 14px;
    font-weight: 600;
    display: inline-block;
    cursor: pointer;
}

.button-disable {
    color: rgba(0, 0, 0, .2) !important;
    background-color: rgba(0, 0, 0, .02) !important;   
}

.previous {
    border: 1px solid $borderColor;
    border-right: none;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
}

.next {
    border: 1px solid $borderColor;
    border-left: none;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
}    
</style>

<script>
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
        customClass: {
             type: String,
             default: '',
        }
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
                    <li class={ classObject } onClick={ onClickEvent }>
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
        let previousButtonIsDistable = '';
        if ( this.current == 1 ) {
            previousButtonIsDistable = 'button-disable';
        }
        let nextButtonIsDistable = '';
        if ( this.current == this.total ) {
            nextButtonIsDistable = 'button-disable';
        }
        return (
            <div class={ [ "pagination", this.customClass ] }>
                <button 
                    onClick={ () => this.chooseEvent('previous') } 
                    class={ [ 'previous', previousButtonIsDistable ] }
                >Previous</button>
                <ul>
                    { this.previousPages( h ) }
                    { this.pagesContent( h ) }
                    { this.nextPages( h ) }
                </ul>
                <button 
                    onClick={ () => this.chooseEvent('next') }
                    class={ ['next', nextButtonIsDistable] }
                >Next</button>
            </div>
        );
    }
};
</script>