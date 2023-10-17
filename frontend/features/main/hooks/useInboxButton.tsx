/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { getInboxes, markInboxSeenMany } from '@/features/auth/data/api';
import useInboxesStore from '@/store/inboxes.store';
import inboxType from '@/type/inboxType';
import useOnClickOutside from '@/features/main/hooks/useOnClickOutside';

const useInboxButton = () => {
    const [activeInboxCategory, setActiveInboxCategory] = useState<'all' | 'unseen' | 'seen'>('all');
    const menuRef = useOnClickOutside(() => setShowMenu(false));
    const [page, setPage] = useState<number>(1);
    const [lastPage, setLastPage] = useState<number>(1);
    const [dataToShow, setDataToShow] = useState<inboxType[]>([]);
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const { inboxes, setInboxes, markSeenInboxes } = useInboxesStore((state) => ({
        inboxes: state.inboxes,
        setInboxes: state.setInboxes,
        markSeenInboxes: state.markSeenInboxes,
    }));

    // * INITIAL LOAD
    useEffect(() => {
        getInboxes()
            .then((result) => {
                setInboxes(result.data.data.data);
            })
            .catch(() => {
                console.log('Load inbox failed!');
                return;
            });
    }, []);

    // * INBOX OPENED
    useEffect(() => {
        if (showMenu) {
            getInboxes(page, activeInboxCategory).then((result) => {
                const inboxesToStore = result.data.data.data.filter((resultItem: inboxType) => {
                    let isExist = inboxes.find((inboxItem) => inboxItem.id === resultItem.id);
                    if (!isExist) {
                        return resultItem;
                    }
                });

                inboxesToStore.length > 0 && setInboxes([...inboxes, ...inboxesToStore]);

                markSeenInboxes();
                const unseenInboxesId = [...inboxes, ...inboxesToStore].filter((inboxItem) => inboxItem.is_seen === 0);
                unseenInboxesId.length > 0 && markInboxSeenMany(unseenInboxesId.map((inbox) => inbox.id));

                setDataToShow(
                    [...inboxes, ...inboxesToStore].filter((inbox) => {
                        switch (activeInboxCategory) {
                            case 'seen':
                                return inbox.is_seen === 1;
                            case 'unseen':
                                return inbox.is_seen === 0;
                            default:
                                return true;
                        }
                    })
                );
            });
        }
    }, [showMenu, activeInboxCategory, page]);

    // * Inboxes updated
    useEffect(() => {
        setDataToShow(
            inboxes.filter((inbox) => {
                switch (activeInboxCategory) {
                    case 'seen':
                        return inbox.is_seen === 1;
                    case 'unseen':
                        return inbox.is_seen === 0;
                    default:
                        return true;
                }
            })
        );
    }, [inboxes]);

    return {
        menuRef,
        setShowMenu,
        showMenu,
        activeInboxCategory,
        setActiveInboxCategory,
        dataToShow,
        page,
        lastPage,
        setPage,
    };
};

export default useInboxButton;
