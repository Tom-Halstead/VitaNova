package com.vitanova.backend.entry.dto;


import lombok.Getter;

import java.util.Objects;

@Getter
public class PhotoDTO {

    private int photoId;
    private String url;

    public PhotoDTO() { }

    public PhotoDTO(int photoId, String url) {
        this.photoId = photoId;
        this.url     = url;
    }

    public void setPhotoId(int photoId) {
        this.photoId = photoId;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PhotoDTO that)) return false;
        return Objects.equals(photoId, that.photoId) &&
                Objects.equals(url, that.url);
    }

    @Override
    public int hashCode() {
        return Objects.hash(photoId, url);
    }

    @Override
    public String toString() {
        return "PhotoDto{" +
                "photoId=" + photoId +
                ", url='" + url + '\'' +
                '}';
    }
}

