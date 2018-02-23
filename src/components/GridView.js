'use strict';

import React, {Component} from 'react';


import {
    View,
    StyleSheet,
    ListView,
    Dimensions,
} from 'react-native';
const {width, height} = Dimensions.get('window');

class GridView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: {},
            style: {},
            itemsPerRow: 1,
            renderItem: null,
            onEndReached: null,
            scrollEnabled: true,
            renderSeparator: null,
            fillIncompleteRow: false,
            renderHeader: null,
            automaticallyAdjustContentInsets: false
        };
        this.renderRowGroup=this.renderRowGroup.bind(this);
        this.createGroup=this.createGroup.bind(this);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.goToTop!=this.props.goToTop){
            this.refs.sglistview.getScrollResponder().scrollResponderScrollTo({ x: 0, y:0, animated: true });
        }
    }

    createGroup(items, itemsPerRow) {
        let group = [];
        let itemGroups = [];

        items.forEach(function (item) {
            if (group.length === itemsPerRow) {
                itemGroups.push(group);
                group = [item];
            } else {
                group.push(item);
            }
        });

        if (group.length > 0) {
            if (this.props.fillIncompleteRow === true) {
                while (group.length < itemsPerRow) {
                    group.push(null);
                }
            }
            itemGroups.push(group);
        }

        return itemGroups;
    }


    groupItems(items, hasHeaders, itemsPerRow) {
        if (hasHeaders) {
            let data = {};

            for (let i in items) {
                data[i] = this.createGroup(items[i], itemsPerRow);
            }

            return data;
        }

        return this.createGroup(items, itemsPerRow);
    }


    renderRowGroup(group, sectionID, rowID) {
        let items = group.map(item => this.props.renderItem(item));

        return (
            <View style={[styles.row]}>
                {items}
            </View>
        );
    }


    render() {
        let dsContent = null;
        let hasHeaders = !Array.isArray(this.props.items);
        let groups = this.groupItems(this.props.items,
            hasHeaders,
            this.props.itemsPerRow);
        let ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2,
            sectionHeaderHasChanged: (s1, s2) => s1 !== s2
        });

        if (hasHeaders) {
            dsContent = ds.cloneWithRowsAndSections(groups);
        } else {
            dsContent = ds.cloneWithRows(groups);
        }

        return (
            <ListView
                ref={'sglistview'}
                dataSource={dsContent}
                style={this.props.style}
                renderRow={this.renderRowGroup}
                onEndReached={this.props.onEndReached}
                initialListSize={20}
                contentContainerStyle={this.props.contentContainerStyle}
                onEndReachedThreshold={100}
                scrollRenderAheadDistance={50}
                pageSize={20}
                stickyHeaderIndices={[]}
                enableEmptySections={true}
                automaticallyAdjustContentInsets={this.props.automaticallyAdjustContentInsets}/>
        );
    }
}

let styles = StyleSheet.create({
    row: {
        alignItems: 'flex-start',
        flexDirection: 'row',
        justifyContent: 'flex-start',

    }
});


module.exports = GridView;
